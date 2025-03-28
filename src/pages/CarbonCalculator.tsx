import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Overview from '../components/carbon-calculator/Overview';
import TransportForm from '../components/carbon-calculator/TransportForm';
import HouseForm from '../components/carbon-calculator/HouseForm';
import FoodForm from '../components/carbon-calculator/FoodForm';
import { FaLeaf } from 'react-icons/fa';
import Icon from '../components/carbon-calculator/Icon';
import EcoTasks from '../components/carbon-calculator/EcoTasks';

const CarbonCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    transport: {
      voiture: 0,
      avion: 0,
      transportsCommun: 0
    },
    maison: {
      electricite: 0,
      chauffage: 0
    },
    alimentation: {
      viande: 0,
      legumes: 0
    }
  });
  const [ecoTasksReduction, setEcoTasksReduction] = useState(0);

  const handleInputChange = (category: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: Number(value)
      }
    }));
  };

  const calculateTotal = () => {
    const coefficients = {
      voiture: 0.2,
      avion: 0.285,
      transportsCommun: 0.05,
      electricite: 0.1,
      chauffage: 0.2,
      viande: 7,
      legumes: 2
    };

    const total = Object.entries(formData).reduce((acc, [category, values]) => {
      return acc + Object.entries(values).reduce((categoryAcc, [field, value]) => {
        return categoryAcc + (value * coefficients[field as keyof typeof coefficients]);
      }, 0);
    }, 0);

    return (total - ecoTasksReduction).toFixed(2);
  };

  const getEmissionLevel = (total: number) => {
    if (total < 1000) return { color: 'text-green-400', message: 'Excellent ! Continuez ainsi !' };
    if (total < 2000) return { color: 'text-yellow-400', message: 'Pas mal ! Quelques efforts à faire.' };
    return { color: 'text-red-400', message: 'Attention ! Votre empreinte est élevée.' };
  };

  const total = Number(calculateTotal());
  const { color, message } = getEmissionLevel(total);

  const chartData = [
    {
      name: 'Voiture',
      value: formData.transport.voiture * 0.2,
      color: '#60A5FA'
    },
    {
      name: 'Avion',
      value: formData.transport.avion * 0.285,
      color: '#A78BFA'
    },
    {
      name: 'Transports en commun',
      value: formData.transport.transportsCommun * 0.05,
      color: '#4ADE80'
    },
    {
      name: 'Vélo',
      value: 0,
      color: '#FBBF24'
    }
  ];

  const steps = [
    {
      title: "Votre Consommation",
      content: (
        <div className="space-y-6">
          <Overview
            total={total}
            color={color}
            message={message}
            chartData={chartData}
            onStart={() => setCurrentStep(1)}
            transportData={formData.transport}
          />
          <EcoTasks
            currentCO2={total}
            onCO2Update={(reduction) => setEcoTasksReduction(reduction)}
          />
        </div>
      )
    },
    {
      title: "Transport",
      content: (
        <TransportForm
          formData={formData.transport}
          onInputChange={(field, value) => handleInputChange('transport', field, value)}
          onBack={() => setCurrentStep(0)}
          onNext={() => setCurrentStep(2)}
        />
      )
    },
    {
      title: "Maison",
      content: (
        <HouseForm
          formData={formData.maison}
          onInputChange={(field, value) => handleInputChange('maison', field, value)}
          onBack={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
        />
      )
    },
    {
      title: "Alimentation",
      content: (
        <FoodForm
          formData={formData.alimentation}
          onInputChange={(field, value) => handleInputChange('alimentation', field, value)}
          onBack={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(0)}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A2F44] text-white">
      <div className="container mx-auto p-4">
        <motion.h1
          className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Icon icon={FaLeaf} className="text-[#49CB91] text-4xl" />
          <span>Mon Impact Carbone</span>
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CarbonCalculator;
