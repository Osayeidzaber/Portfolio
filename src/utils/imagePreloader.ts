import { errorHandler } from './errorHandler';

// Function to check if a file exists
const checkFileExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Essential images including external ones
const essentialImages = [
  {
    path: '/profile/avatar.png',  // Your profile picture if you want one
    width: 400,
    height: 400,
    alt: 'Profile Picture',
    required: false
  },
  {
    path: '/favicon.ico',         // Your site favicon
    width: 32,
    height: 32,
    alt: 'Favicon',
    required: false
  },
  {
    path: 'https://camo.githubusercontent.com/683c131a07ca37be46c074e794b6a1acdcb4c8cbaad35c73a0ec151aa929727b/68747470733a2f2f696d6775722e636f6d2f58347a48534e472e706e67',
    width: 800,
    height: 600,
    alt: 'TodoList Preview',
    required: true
  },
  {
    path: 'https://cdn.discordapp.com/attachments/1071372492704329878/1336360755552981043/image.png',
    width: 800,
    height: 600,
    alt: 'Valentines Day Project',
    required: true
  }
];

// Filter out non-existent images before attempting to load them
const validateImages = async (images: typeof essentialImages) => {
  const validatedImages = [];
  
  for (const image of images) {
    const exists = await checkFileExists(image.path);
    if (exists) {
      validatedImages.push(image);
    } else if (image.required) {
      errorHandler.handle(
        `Required image missing: ${image.path}`,
        'error',
        'ImageValidator'
      );
    } else {
      errorHandler.handle(
        `Optional image not found: ${image.path}`,
        'info',
        'ImageValidator'
      );
    }
  }
  
  return validatedImages;
};

const loadImage = (path: string, retries = 2): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    
    img.onload = () => resolve();
    img.onerror = () => {
      if (retries > 0) {
        errorHandler.handle(
          `Retrying to load image: ${path}`,
          'info',
          'ImageLoader'
        );
        setTimeout(() => {
          loadImage(path, retries - 1).then(resolve);
        }, 1000);
      } else {
        resolve(); // Resolve anyway to prevent blocking
      }
    };
  });
};

export const getLoadingProgress = async (
  onProgress: (progress: number) => void
) => {
  try {
    // First validate which images actually exist
    const validImages = await validateImages(essentialImages);
    
    if (validImages.length === 0) {
      onProgress(100); // Skip loading if no valid images
      return;
    }

    let loaded = 0;
    const total = validImages.length;

    const loadWithProgress = async (image: typeof validImages[0]) => {
      try {
        await loadImage(image.path);
        loaded++;
        onProgress((loaded / total) * 100);
      } catch {
        loaded++;
        onProgress((loaded / total) * 100);
      }
    };

    // Load images in parallel but with a limit
    const batchSize = 2;
    for (let i = 0; i < validImages.length; i += batchSize) {
      const batch = validImages.slice(i, i + batchSize);
      await Promise.all(batch.map(loadWithProgress));
    }
  } catch (error) {
    errorHandler.handle(
      'Failed to initialize image loading',
      'warning',
      'ImageLoader'
    );
    onProgress(100); // Ensure loading completes even on error
  }
};

export { essentialImages }; 