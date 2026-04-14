import { motion } from 'motion/react';
import { platforms, movies } from '../data/mockData';
import { Film } from 'lucide-react';

export function Platforms() {
  const getPlatformMovieCount = (platformId: string) => {
    return movies.filter(m => m.platform === platformId).length;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl mb-4">Streaming Platforms</h1>
          <p className="text-xl text-muted-foreground">
            All the platforms we track in one place
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.map((platform, index) => {
            const movieCount = getPlatformMovieCount(platform.id);
            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-card to-secondary border border-border/50 hover:border-accent/50 transition-all duration-500"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${platform.color}20, transparent)`,
                    }}
                  />
                </div>

                <div className="relative p-8">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-5xl shadow-lg transition-all duration-500 group-hover:shadow-2xl"
                    style={{
                      backgroundColor: `${platform.color}30`,
                      borderColor: `${platform.color}50`,
                      borderWidth: '2px',
                    }}
                  >
                    {platform.icon}
                  </motion.div>

                  <h3
                    className="text-2xl text-center mb-3 transition-colors duration-300"
                    style={{
                      color: platform.color,
                    }}
                  >
                    {platform.name}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Film className="w-4 h-4" />
                    <span className="text-sm">
                      {movieCount} {movieCount === 1 ? 'title' : 'titles'}
                    </span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-lg transition-all duration-300 border border-border/50 hover:border-accent/50 hover:bg-accent/10"
                    >
                      View Content
                    </motion.button>
                  </div>
                </div>

                <div
                  className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: platform.color }}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20"
        >
          <div className="text-center">
            <h2 className="text-3xl mb-4">Want to see more platforms?</h2>
            <p className="text-muted-foreground mb-6">
              We're constantly adding new streaming services to help you find all your favorite content in one place.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300"
            >
              Request a Platform
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
