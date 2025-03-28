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
  const inputs = [
    {
      icon: GiMeat,
      label: "Viande et poisson",
      field: "viande",
      placeholder: "Portions par semaine",
      value: formData.viande || '',
      color: "bg-red-500",
      description: "Nombre de portions hebdomadaires"
    },
    {
      icon: GiFruitBowl,
      label: "Fruits et légumes",
      field: "legumes",
      placeholder: "Portions par semaine",
      value: formData.legumes || '',
      color: "bg-[#49CB91]",
      description: "Nombre de portions hebdomadaires"
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
        <h2 className="text-2xl font-bold mb-2 text-center">Votre Alimentation</h2>
        <p className="text-gray-400 text-center mb-6">Estimez votre consommation alimentaire hebdomadaire</p>

        <div className="space-y-4">
          {inputs.map((input) => (
            <div key={input.field}>
              <label className="block text-sm font-medium mb-1 text-gray-400">
                {input.label}
              </label>
              <input
                type="number"
                className={`w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-${input.color} focus:border-transparent`}
                placeholder={input.placeholder}
                value={input.value}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">{input.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-between">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center gap-2"
          onClick={onBack}
        >
          <Icon icon={FaArrowLeft} />
          Retour
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center gap-2"
          onClick={onNext}
        >
          Terminer
          <Icon icon={FaArrowRight} />
        </motion.button>
      </div>
    </div>
  );
};

export default FoodForm;
