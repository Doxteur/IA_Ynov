import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { GiMeat, GiFruitBowl } from 'react-icons/gi';

interface FoodFormProps {
  formData: {
    viande: number;
    legumes: number;
  };
  onInputChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const FoodForm: React.FC<FoodFormProps> = ({
  formData,
  onInputChange,
  onBack,
  onNext
}) => {
  const foodFields = [
    {
      icon: GiMeat,
      label: "Viande et poisson",
      field: "viande",
      placeholder: "Portions par semaine",
      value: formData.viande || '',
      color: "text-[#D2600F]",
      description: "Nombre de portions hebdomadaires"
    },
    {
      icon: GiFruitBowl,
      label: "Fruits et légumes",
      field: "legumes",
      placeholder: "Portions par semaine",
      value: formData.legumes || '',
      color: "text-[#C3CDC1]",
      description: "Nombre de portions hebdomadaires"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    onInputChange(field, value === '' ? '0' : value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#2C3F42]">Alimentation</h2>
      <div className="space-y-6">
        {foodFields.map((field) => (
          <div key={field.field} className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon icon={field.icon} className={`${field.color} text-xl`} />
              <label className="text-[#2C3F42] block">{field.label}</label>
            </div>
            <input
              type="number"
              value={field.value}
              onChange={(e) => handleInputChange(field.field, e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-[#2C3F42] border border-[#C3CDC1] focus:outline-none focus:ring-2 focus:ring-[#D2600F]"
              placeholder={field.placeholder}
            />
            <p className="text-sm text-[#2C3F42] mt-1">{field.description}</p>
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
          Terminer
        </button>
      </div>
    </div>
  );
};

export default FoodForm;
