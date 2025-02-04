'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LanguageStats {
  [key: string]: number;
}

interface GitHubData {
  languages: LanguageStats;
  totalStars: number;
  totalRepos: number;
  contributions: number;
}

const GitHubStats = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Osayeedjaber/repos');
        const repos = await response.json();
        
        // Aggregate language data
        const languages: LanguageStats = {};
        let totalStars = 0;
        
        repos.forEach((repo: any) => {
          if (repo.language && !repo.fork) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
          totalStars += repo.stargazers_count;
        });

        setData({
          languages,
          totalStars,
          totalRepos: repos.length,
          contributions: repos.filter((repo: any) => !repo.fork).length
        });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {/* Languages Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 p-6 rounded-xl shadow-lg backdrop-blur-sm"
      >
        <h3 className="text-xl font-semibold mb-4">Top Languages</h3>
        <div className="space-y-3">
          {data && Object.entries(data.languages)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([language, count]) => (
              <div key={language} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{language}</span>
                  <span className="text-sm text-gray-400">
                    {Math.round((count / Object.values(data.languages).reduce((a, b) => a + b, 0)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{
                      width: `${(count / Object.values(data.languages).reduce((a, b) => a + b, 0)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 p-6 rounded-xl shadow-lg backdrop-blur-sm"
      >
        <h3 className="text-xl font-semibold mb-4">GitHub Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Public Repos</span>
            <span className="text-xl font-bold">{data?.totalRepos}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Stars</span>
            <span className="text-xl font-bold">{data?.totalStars}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Contributions</span>
            <span className="text-xl font-bold">{data?.contributions}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GitHubStats; 