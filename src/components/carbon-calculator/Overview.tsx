import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import { FaArrowRight, FaCar, FaBicycle, FaTrain, FaPlane } from 'react-icons/fa';
import ProgressCircle from './ProgressCircle';
import EmissionsChart from './EmissionsChart';

interface OverviewProps {
  total: number;
  color: string;
  message: string;
  chartData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  onStart: () => void;
  transportData: {
    voiture: number;
    avion: number;
    transportsCommun: number;
  };
}

const Overview: React.FC<OverviewProps> = ({
  total,
  color,
  message,
  chartData,
  onStart,
  transportData
}) => {
  const targetCO2 = 2000; // Objectif en kg CO2/an

  // Calcul des émissions par type de transport
  const transportEmissions = {
    voiture: transportData.voiture * 0.2,
    avion: transportData.avion * 0.285,
    transportsCommun: transportData.transportsCommun * 0.05
  };

  // Liste complète des moyens de transport avec leurs données
  const allTransports = [
    {
      icon: FaCar,
      name: 'Voiture',
      distance: transportData.voiture,
      emissions: transportEmissions.voiture,
      color: 'text-[#D2600F]',
      time: 'Ce mois',
      unit: 'km/mois'
    },
    {
      icon: FaPlane,
      name: 'Avion',
      distance: transportData.avion,
      emissions: transportEmissions.avion,
      color: 'text-[#2C3F42]',
      time: 'Cette année',
      unit: 'km/an'
    },
    {
      icon: FaTrain,
      name: 'Transports en commun',
      distance: transportData.transportsCommun,
      emissions: transportEmissions.transportsCommun,
      color: 'text-[#C3CDC1]',
      time: 'Ce mois',
      unit: 'km/mois'
    },
    {
      icon: FaBicycle,
      name: 'Vélo',
      distance: 0,
      emissions: 0,
      color: 'text-[#D2600F]',
      time: 'Ce mois',
      unit: 'km/mois'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Main CO2 Circle with Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-6 text-[#2C3F42]">Votre Impact CO₂</h3>
          <div className="relative w-[200px] h-[200px]">
            <div className="absolute inset-0">
              <EmissionsChart data={chartData} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ProgressCircle
                value={total}
                maxValue={targetCO2}
                size={160}
                color={color.replace('text-', '').replace('400', '')}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1 text-[#2C3F42]">{total}</div>
                  <div className="text-[#2C3F42]">kg CO₂</div>
                </div>
              </ProgressCircle>
            </div>
          </div>
          <p className="mt-4 text-[#2C3F42]">{message}</p>
        </div>
      </div>

      {/* Recent Journeys */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-[#2C3F42]">Vos déplacements</h3>
        <div className="space-y-4">
          {allTransports.map((transport, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-[#FFF8F0] rounded-lg hover:bg-[#C3CDC1]/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon icon={transport.icon} className={`${transport.color} text-xl`} />
                <div>
                  <div className="font-medium text-[#2C3F42]">{transport.name}</div>
                  <div className="text-sm text-[#2C3F42]/70">{transport.distance} {transport.unit}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${transport.color}`}>{transport.emissions.toFixed(1)} kg CO₂</div>
                <div className="text-sm text-[#2C3F42]/70">{transport.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full bg-[#D2600F] text-[#FFF8F0] py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#B8500E] transition-colors shadow-lg"
        onClick={onStart}
      >
        Commencer le questionnaire
        <Icon icon={FaArrowRight} />
      </motion.button>
    </motion.div>
  );
};

export default Overview;
