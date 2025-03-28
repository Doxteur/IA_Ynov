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
      color: "text-[#D2600F]",
      description: "Consommation mensuelle en kilowattheure",
      unit: "/mois"
    },
    {
      icon: FaFire,
      label: "Chauffage",
      field: "chauffage",
      placeholder: "Consommation en kWh",
      value: formData.chauffage || '',
      color: "text-[#2C3F42]",
      description: "Consommation mensuelle de chauffage",
      unit: "/mois"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    onInputChange(field, value === '' ? '0' : value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#2C3F42]">Maison</h2>
      <div className="space-y-6">
        {inputs.map((input) => (
          <div key={input.field} className="space-y-2">
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
          </div>
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

export default HouseForm;
