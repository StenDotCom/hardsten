/**
 * SERVICES — edit titles, descriptions and focus points here.
 * `icon` must be a key handled in src/components/icons/ServiceIcon.tsx.
 * Keep these honest: student-level capability and technical assistance.
 */
export type ServiceIconKey = 'prototype' | 'embedded' | 'automation' | 'academic' | 'cad';

export interface Service {
  id: string;
  letter: string;
  icon: ServiceIconKey;
  title: string;
  tag: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    id: 'hardware-prototyping',
    letter: 'A',
    icon: 'prototype',
    title: 'Hardware Prototyping',
    tag: 'Build & assemble',
    description:
      'Building and assembling hardware prototypes for academic projects, demonstrations, and engineering concepts.',
    points: ['Academic project prototypes', 'Demonstration models', 'Concept-to-hardware builds'],
  },
  {
    id: 'embedded-systems',
    letter: 'B',
    icon: 'embedded',
    title: 'Embedded Systems',
    tag: 'Microcontrollers',
    description:
      'Working with microcontrollers, sensors, electronics, and basic hardware-software integration for student and prototype projects.',
    points: ['Microcontroller projects', 'Sensor integration', 'Basic hardware–software integration'],
  },
  {
    id: 'electronics-automation',
    letter: 'C',
    icon: 'automation',
    title: 'Electronics & Automation Projects',
    tag: 'Sensors & control',
    description:
      'Exploring automation systems involving electronics, sensors, controllers, and related components.',
    points: ['Electronics & sensors', 'Controllers', 'Automation concepts'],
  },
  {
    id: 'academic-assistance',
    letter: 'D',
    icon: 'academic',
    title: 'Academic Engineering Project Assistance',
    tag: 'Plan · Build · Document',
    description:
      'Assisting with planning, prototyping, technical documentation, and development for hardware-focused school projects and research prototypes.',
    points: ['Project planning', 'Prototyping support', 'Technical documentation'],
  },
  {
    id: 'autocad-planning',
    letter: 'E',
    icon: 'cad',
    title: 'AutoCAD & Technical Planning',
    tag: 'Drafting',
    description:
      'Creating or assisting with technical drawings, floor plans, and electrical wiring layouts using AutoCAD.',
    points: ['Technical drawings', 'Floor plans', 'Electrical wiring layouts'],
  },
];

/** Shown on the Services page. */
export const servicesDisclaimer =
  'All services are offered as student-level technical assistance. I am a Computer Engineering student, not a licensed professional engineer, and drawings or layouts I prepare are not certified or officially approved.';
