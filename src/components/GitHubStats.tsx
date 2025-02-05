'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; count: number }[];
  followers: number;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [reposResponse, userResponse] = await Promise.all([
          fetch('https://api.github.com/users/OsayeedJaber/repos'),
          fetch('https://api.github.com/users/OsayeedJaber')
        ]);

        const repos = await reposResponse.json();
        const user = await userResponse.json();

        const languages: Record<string, number> = {};
        repos.forEach((repo: any) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        const topLanguages = Object.entries(languages)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        setStats({
          totalRepos: repos.length,
          totalStars: repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
          totalForks: repos.reduce((acc: number, repo: any) => acc + repo.forks_count, 0),
          topLanguages,
          followers: user.followers
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading || !stats) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Main Stats Card */}
      <motion.div
        className="bg-purple-500/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h2 className="text-xl font-bold">GitHub Stats</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Repositories', value: stats.totalRepos, icon: '📚' },
            { label: 'Stars', value: stats.totalStars, icon: '⭐' },
            { label: 'Forks', value: stats.totalForks, icon: '🔱' },
            { label: 'Followers', value: stats.followers, icon: '👥' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-3 bg-purple-500/5 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <span>{stat.icon}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <motion.span 
                className="text-2xl font-bold text-purple-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Languages Card */}
      <motion.div
        className="bg-purple-500/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xl">💻</span>
          <h2 className="text-xl font-bold">Top Languages</h2>
        </motion.div>

        <div className="space-y-4">
          {stats.topLanguages.map((lang, index) => (
            <motion.div
              key={lang.name}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-mono">{lang.name}</span>
                <span className="text-xs text-purple-400">{lang.count} projects</span>
              </div>
              <div className="w-full h-2 bg-purple-500/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-500/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(lang.count / stats.topLanguages.reduce((acc, l) => acc + l.count, 0)) * 100}%` 
                  }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GitHubStats; 