import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import { FaArrowLeft, FaArrowRight, FaCar, FaPlane, FaTrain } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface TransportFormProps {
  formData: {
    voiture: number;
    avion: number;
    transportsCommun: number;
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

const TransportForm: React.FC<TransportFormProps> = ({
  formData,
  onInputChange,
  onBack,
  onNext,
}) => {
  const inputs: InputConfig[] = [
    {
      icon: FaCar,
      label: "Voiture",
      field: "voiture",
      placeholder: "Kilomètres par mois",
      value: formData.voiture || '',
      color: "text-[#D2600F]",
      description: "Distance moyenne parcourue en voiture chaque mois",
      unit: "/mois"
    },
    {
      icon: FaPlane,
      label: "Avion",
      field: "avion",
      placeholder: "Kilomètres par an",
      value: formData.avion || '',
      color: "text-[#2C3F42]",
      description: "Distance totale parcourue en avion sur une année",
      unit: "/an"
    },
    {
      icon: FaTrain,
      label: "Transports en commun",
      field: "transportsCommun",
      placeholder: "Kilomètres par mois",
      value: formData.transportsCommun || '',
      color: "text-[#C3CDC1]",
      description: "Distance mensuelle en transports en commun",
      unit: "/mois"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    onInputChange(field, value === '' ? '0' : value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#2C3F42]">Transport</h2>
      <div className="space-y-6">
        {inputs.map((input, index) => (
          <motion.div
            key={input.field}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Icon icon={input.icon} className={`${input.color} text-xl`} />
              <label className="text-[#2C3F42] block">{input.label}</label>
            </div>
            <input
              type="number"
              value={input.value}
              onChange={(e) => handleInputChange(input.field, e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-[#2C3F42] border border-[#C3CDC1] focus:outline-none focus:ring-2 focus:ring-[#D2600F]"
              placeholder={input.placeholder}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg bg-[#C3CDC1] text-[#2C3F42] hover:bg-[#A5B0A3] transition-colors"
        >
          Retour
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-lg bg-[#D2600F] text-[#FFF8F0] hover:bg-[#B8500E] transition-colors"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default TransportForm;
