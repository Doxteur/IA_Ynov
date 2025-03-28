import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import { FaArrowLeft, FaArrowRight, FaBolt, FaFire } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface HouseFormProps {
  formData: {
    electricite: number;
    chauffage: number;
  };
  onInputChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

interface InputConfig {
  icon: IconType;
  label: string;
  field: string;
  placeholder: string;
  value: string | number;
  color: string;
  description: string;
  unit: string;
}

const HouseForm: React.FC<HouseFormProps> = ({
  formData,
  onInputChange,
  onBack,
  onNext,
}) => {
  const inputs: InputConfig[] = [
    {
      icon: FaBolt,
      label: "Électricité",
      field: "electricite",
      placeholder: "Consommation en kWh",
      value: formData.electricite || '',
      color: "bg-yellow-500",
      description: "Consommation mensuelle en kilowattheure",
      unit: "/mois"
    },
    {
      icon: FaFire,
      label: "Chauffage",
      field: "chauffage",
      placeholder: "Consommation en kWh",
      value: formData.chauffage || '',
      color: "bg-orange-500",
      description: "Consommation mensuelle de chauffage",
      unit: "/mois"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    onInputChange(field, value === '' ? '0' : value);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Votre Logement</h2>
        <p className="text-gray-400 text-center mb-6">Renseignez vos consommations énergétiques mensuelles en kilowattheure (kWh)</p>

        <div className="space-y-6">
          {inputs.map((input, index) => (
            <motion.div
              key={input.field}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className={`${input.color} p-3 rounded-full shrink-0`}>
                  <Icon icon={input.icon} className="text-white text-xl" />
                </div>
                <div>
                  <label className="text-lg font-medium block">{input.label}</label>
                  <p className="text-gray-400 text-sm mt-1">{input.description}</p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={input.value}
                  onChange={(e) => handleInputChange(input.field, e.target.value)}
                  placeholder={input.placeholder}
                  className="w-full bg-gray-600/50 rounded-lg px-4 py-3 pr-24 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49CB91] transition-all"
                />
                <div className="absolute right-0 top-0 h-full flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-400">{input.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-between gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex-1 bg-gray-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
        >
          <Icon icon={FaArrowLeft} />
          Retour
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="flex-1 bg-[#49CB91] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
        >
          Suivant
          <Icon icon={FaArrowRight} />
        </motion.button>
      </div>
    </div>
  );
};

export default HouseForm;
