import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { FaLeaf, FaCheck, FaArrowDown } from 'react-icons/fa';

interface Task {
  id: number;
  title: string;
  description: string;
  impact: string;
  co2Reduction: number;
  completed: boolean;
}

interface EcoTasksProps {
  currentCO2: number;
  onCO2Update: (reduction: number) => void;
}

const EcoTasks: React.FC<EcoTasksProps> = ({ currentCO2, onCO2Update }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Éteindre les appareils en veille",
      description: "Débranchez vos appareils électroniques la nuit",
      impact: "Économisez jusqu'à 10% sur votre facture d'électricité",
      co2Reduction: 50, // en kg de CO2
      completed: false
    },
    {
      id: 2,
      title: "Utiliser les transports en commun",
      description: "Prenez le bus ou le train pour vos trajets quotidiens",
      impact: "Réduisez vos émissions de CO2 de transport de 50%",
      co2Reduction: 150,
      completed: false
    },
    {
      id: 3,
      title: "Réduire la consommation de viande",
      description: "Essayez un repas végétarien par semaine",
      impact: "Diminuez votre empreinte alimentaire de 15%",
      co2Reduction: 100,
      completed: false
    },
    {
      id: 4,
      title: "Installer des LED",
      description: "Remplacez vos ampoules classiques par des LED",
      impact: "Réduisez votre consommation d'éclairage de 80%",
      co2Reduction: 30,
      completed: false
    },
    {
      id: 5,
      title: "Baisser le chauffage de 1°C",
      description: "Réduisez la température de votre logement d'un degré",
      impact: "7% d'économie sur votre facture de chauffage",
      co2Reduction: 120,
      completed: false
    },
    {
      id: 6,
      title: "Privilégier les produits locaux",
      description: "Achetez des fruits et légumes de saison produits localement",
      impact: "Réduisez l'impact du transport alimentaire",
      co2Reduction: 80,
      completed: false
    },
    {
      id: 7,
      title: "Utiliser un vélo",
      description: "Remplacez la voiture par le vélo pour les courts trajets",
      impact: "Zéro émission et meilleure santé",
      co2Reduction: 90,
      completed: false
    },
    {
      id: 8,
      title: "Réduire le gaspillage alimentaire",
      description: "Planifiez vos repas et utilisez les restes",
      impact: "Économisez 30% sur votre budget alimentaire",
      co2Reduction: 70,
      completed: false
    },
    {
      id: 9,
      title: "Installer un mousseur d'eau",
      description: "Réduisez votre consommation d'eau chaude",
      impact: "Jusqu'à 50% d'économie d'eau",
      co2Reduction: 40,
      completed: false
    },
    {
      id: 10,
      title: "Composter ses déchets",
      description: "Créez votre propre compost pour les déchets organiques",
      impact: "Réduisez vos déchets de 30%",
      co2Reduction: 60,
      completed: false
    }
  ]);

  const [totalReduction, setTotalReduction] = useState(0);

  const toggleTask = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Calculer la nouvelle réduction totale
    const newReduction = updatedTasks
      .filter(task => task.completed)
      .reduce((sum, task) => sum + task.co2Reduction, 0);

    setTotalReduction(newReduction);
    onCO2Update(newReduction);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <Icon icon={FaLeaf} className="text-[#D2600F] text-2xl" />
          <h2 className="text-xl font-bold text-[#2C3F42]">Actions Écologiques</h2>
        </div>
        <AnimatePresence>
          {totalReduction > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 text-[#D2600F]"
            >
              <Icon icon={FaArrowDown} />
              <span className="font-bold">{totalReduction} kg CO₂</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-[#C3CDC1] scrollbar-thumb-[#D2600F] hover:scrollbar-thumb-[#B8500E]">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-[#FFF8F0] rounded-xl p-4 backdrop-blur-sm transition-colors ${
              task.completed ? 'bg-opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${
                  task.completed
                    ? 'border-[#D2600F] bg-[#D2600F]'
                    : 'border-[#C3CDC1] hover:border-[#D2600F]'
                }`}
              >
                {task.completed && <Icon icon={FaCheck} className="text-white text-sm" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-medium mb-1 ${
                    task.completed ? 'text-[#C3CDC1] line-through' : 'text-[#2C3F42]'
                  }`}>
                    {task.title}
                  </h3>
                  <span className={`text-sm ${
                    task.completed ? 'text-[#D2600F]' : 'text-[#2C3F42]/70'
                  }`}>
                    -{task.co2Reduction} kg CO₂
                  </span>
                </div>
                <p className={`text-sm ${
                  task.completed ? 'text-[#C3CDC1]' : 'text-[#2C3F42]/70'
                }`}>
                  {task.description}
                </p>
                <p className={`text-sm mt-2 ${
                  task.completed ? 'text-[#C3CDC1]' : 'text-[#D2600F]'
                }`}>
                  {task.impact}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EcoTasks;
