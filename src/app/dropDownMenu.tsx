import React, { useState, useRef, useEffect, useCallback } from 'react';
import Icon from './icons/Icon'; // Assuming Icon component is in the same directory
import clsx from 'clsx';
import Toggle from './UnitsToggle';
import { Units } from './types';

interface DropdownMenuProps {
  units: Units;
  setUnits: (units: Units) => void;
}

export default function DropdownMenu({units, setUnits}: DropdownMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleUnitChange = useCallback(() => {
    setUnits(units === 'imperial' ? 'metric' : 'imperial');
  }, [units, setUnits]);

  return (
    <div className="relative inline-block text-left ml-auto" ref={dropdownRef}>
      <button
        className={clsx("rounded-md hover:bg-gray-100 p-2", isOpen ? "bg-gray-100" : "")}
        onClick={toggleDropdown}
      >
        <Icon name="settings" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 focus:outline-none">
          <div className="py-1">
            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Change Units:  <Toggle
              isOn={units === 'metric'}
              onToggle={handleUnitChange}
              label={units === 'imperial' ? 'Fahrenheit' : 'Celsius'}
            />
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
};
