import Image from 'next/image';

const SkillsSection = () => {
  // Assuming skill is defined somewhere in the component
  const skill = {
    icon: '/path/to/skill/icon.png',
    name: 'Skill Name'
  };

  return (
    <div>
      {/* Assuming skill is used in a loop or directly in JSX */}
      <Image
        src={skill.icon}
        alt={skill.name}
        width={120}
        height={40}
        className="h-10 w-auto"
      />
    </div>
  );
};

export default SkillsSection; 