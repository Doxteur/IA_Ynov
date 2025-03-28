import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaChartLine, FaLocationArrow } from 'react-icons/fa';
import Icon from '../components/carbon-calculator/Icon';

const Onboarding = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: FaLocationArrow,
      title: "Calculez simplement",
      description: "Répondez à quelques questions simples sur vos habitudes de transport, logement et alimentation.",
      color: "bg-[#49CB91]"
    },
    {
      icon: FaChartLine,
      title: "Visualisez votre impact",
      description: "Découvrez instantanément votre empreinte carbone et comparez-la aux objectifs climatiques.",
      color: "bg-[#49CB91]"
    },
    {
      icon: FaLeaf,
      title: "Agissez concrètement",
      description: "Obtenez des recommandations personnalisées pour réduire votre impact au quotidien.",
      color: "bg-[#49CB91]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A2F44] text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur EcoTrack</h1>
          <p className="text-gray-400">Suivez et réduisez votre empreinte carbone</p>
        </motion.div>

        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className={`${step.color} p-3 rounded-full`}>
                  <Icon icon={step.icon} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate('/carbon')}
          className="w-full bg-[#49CB91] text-white py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
        >
          Commencer
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding;
