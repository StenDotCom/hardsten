/**
 * PROJECTS DATA
 * ---------------------------------------------------------------------------
 * Every project shown on the site comes from this list. To update a project:
 *  - Text:     edit `title`, `fullTitle`, `summary`, `description`, `context`.
 *  - Status:   edit `status` ('completed' | 'ongoing' | 'prototype') and
 *              `statusLabel` (free text shown on the badge).
 *  - Tech:     add only CONFIRMED items to `technologies` (empty = hidden).
 *  - Photos:   put files in public/images/projects/<slug>/ and list them in
 *              `gallery`. The FIRST gallery item is the cover image.
 *              Set `placeholder: false` (or remove it) for real photos.
 * Paths are relative to /public (no leading slash).
 */

export type ProjectStatus = 'completed' | 'ongoing' | 'prototype';
export type ProjectKind = 'hardware' | 'software';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  /** true = neutral placeholder panel, not a real photograph */
  placeholder?: boolean;
}

export interface Project {
  slug: string;
  number: string;
  kind: ProjectKind;
  category: string;
  title: string;
  fullTitle: string;
  summary: string;
  description: string[];
  context: { label: string; value: string }[];
  status?: ProjectStatus;
  statusLabel?: string;
  technologies: string[];
  /** Optional note + email CTA for requesting full components, diagram, or computation. */
  requestDetailsNote?: string;
  requestDetailsSubject?: string;
  /** Short list of documentation/media slots awaiting real content. */
  documentation: string[];
  gallery: GalleryImage[];
  /** Optional notice when a project has no public details/photos available yet. */
  unavailableNote?: string;
  /** Optional free-form notes; leave empty until you have confirmed details. */
  notes?: string[];
}

const photo = (slug: string, file: string, caption: string, alt?: string): GalleryImage => ({
  src: `images/projects/${slug}/${file}`,
  alt: alt ?? `${caption} — project photograph`,
  caption,
  placeholder: false,
});

export const projects: Project[] = [
  {
    slug: 'bedguard',
    number: '01',
    kind: 'hardware',
    category: 'Embedded Systems',
    title: 'BEDGUARD',
    fullTitle: 'BEDGUARD: Bed Exit Alert System Powered by Arduino Nano and SIM900 GSM Module',
    summary:
      'An assistive healthcare embedded prototype built for Sir Meiko Rios’s course that detects when a patient leaves the bed and sends notifications via a GSM SIM900 module.',
    description: [
      'Developed as a course project under Sir Meiko Rios, BEDGUARD is an assistive healthcare prototype designed to detect when a patient exits a bed and immediately alert caregivers.',
      'When bed exit is detected, the system triggers an audible local alert and sends real-time notifications through the GSM SIM900 module while logging events on the 2.5-inch TFT display.',
      'BEDGUARD is an academic engineering prototype. It is not a certified medical device and makes no claim of clinically proven effectiveness.',
    ],
    context: [
      { label: 'Instructor', value: 'Sir Meiko Rios' },
      { label: 'Core Hardware', value: 'Arduino Nano · GSM Module SIM900 · TFT Display 2.5"' },
    ],
    status: 'completed',
    statusLabel: 'Completed Prototype',
    technologies: ['Arduino Nano', 'GSM Module SIM900', 'TFT Display 2.5 Inches'],
    requestDetailsNote:
      'Want to see the full list of components used and the complete circuit diagram? Send me an email to request them.',
    requestDetailsSubject: 'Requesting Full Components & Diagram — BEDGUARD',
    documentation: [
      'Front and side enclosure views',
      'Internal PCB & SIM900 GSM module layout',
      'PCB circuit & sensor wiring stage',
      'Bed pad sensing mat & buzzer transducer',
    ],
    gallery: [
      photo('bedguard', 'front_view_bedguard.jpg', 'Front View — BEDGUARD Enclosure & 2.5" TFT Event Log Display'),
      photo('bedguard', 'side_view_bedguard.jpg', 'Side View — BEDGUARD Control Unit Enclosure'),
      photo('bedguard', 'components.jpg', 'Internal Electronics — Arduino Nano, SIM900 GSM & Custom PCBs'),
      photo('bedguard', 'breadboard.jpg', 'PCB Stage — Circuit & Sensor Wiring on PCB'),
      photo('bedguard', 'bed-pad.jpg', 'Sensor Input — Pressure-Sensitive Bed Pad Mat'),
      photo('bedguard', 'buzzer.jpg', 'Alert Output — Piezo Buzzer Module'),
    ],
  },
  {
    slug: 'three-floor-elevator',
    number: '02',
    kind: 'hardware',
    category: 'Mechatronics & Microcontroller Prototype',
    title: 'Small-Scale Four-Floor Elevator',
    fullTitle: 'Small-Scale Four-Floor Elevator Powered by Arduino Mega',
    summary:
      'A miniature four-floor elevator prototype built for Engr. Hidalgo’s course, combining a fabricated steel tower, motorized car, and an Arduino Mega control system with motor drivers and custom PCBs.',
    description: [
      'Built for Engr. Hidalgo’s course, this small-scale four-floor elevator demonstrates multi-floor car movement, door actuation, and floor control logic in a physical miniature tower.',
      'The electronic control system is powered by an Arduino Mega paired with motor drivers and custom-built PCBs.',
    ],
    context: [
      { label: 'Instructor', value: 'Engr. Hidalgo' },
      { label: 'Controller', value: 'Arduino Mega' },
    ],
    status: 'completed',
    statusLabel: 'Academic Project',
    technologies: ['Arduino Mega', 'Motor Drivers', 'Custom PCBs'],
    requestDetailsNote:
      'Want to see the full list of components used and the complete circuit diagram? Send me an email to request them.',
    requestDetailsSubject: 'Requesting Full Components & Diagram — Four-Floor Elevator',
    documentation: [
      'Full four-floor steel tower prototype',
      'Motorized elevator car & door assembly',
      'Front and rear views of Arduino Mega, motor drivers & custom PCBs',
    ],
    gallery: [
      photo('three-floor-elevator', '01.jpg', 'Full Prototype — Four-Floor Elevator Tower & Control Base'),
      photo('three-floor-elevator', '02.jpg', 'Angled View — Four-Floor Frame & Elevator Cabin'),
      photo('three-floor-elevator', '03.jpg', 'Side Profile — Structural Frame & Top Drive Assembly'),
      photo('three-floor-elevator', '009.jpg', 'Front Elevation — Four-Floor Elevator Model'),
      photo('three-floor-elevator', 'front_view_of_components.jpg', 'Control Electronics (Front) — Arduino Mega, Motor Drivers & Custom PCBs'),
      photo('three-floor-elevator', 'back_view_of_components.jpg', 'Control Electronics (Rear) — Wiring Harness & Custom PCBs'),
    ],
  },
  {
    slug: 'power-supply-220v-to-12v',
    number: '03',
    kind: 'hardware',
    category: 'Power Electronics Hardware',
    title: '220V to 12V Adjustable Power Supply',
    fullTitle: '220V AC to 12V DC Multi-Tap Adjustable Bench Power Supply',
    summary:
      'A custom-built linear step-down bench power supply in a metal enclosure providing selectable DC outputs from 3V up to 12V for electronics prototyping.',
    description: [
      'Constructed for Sir Meiko Rios’s subject course, this benchtop power supply steps down 220V AC mains voltage into regulated low-voltage DC rails suitable for electronics and microcontroller experiments.',
      'Housed in a ventilated metal enclosure, the unit features a heavy-duty step-down transformer, rectifier and filter capacitor stage, fuse protection, LED power indicator, front rotary selector (3V / 4.5V / 6V / 9V / 12V), and banana/binding post output terminals.',
    ],
    context: [
      { label: 'Instructor', value: 'Sir Meiko Rios' },
      { label: 'Output Range', value: '3V · 4.5V · 6V · 9V · 12V DC' },
      { label: 'Enclosure', value: 'Metal enclosure' },
    ],
    status: 'completed',
    statusLabel: 'Academic Project',
    technologies: ['220V Step-Down Transformer', 'Rectifier & Filter PCB', 'Rotary Voltage Selector', 'Metal Enclosure'],
    requestDetailsNote:
      'Want to see the full list of components used and the complete circuit diagram? Send me an email to request them.',
    requestDetailsSubject: 'Requesting Full Components & Diagram — 220V to 12V Power Supply',
    documentation: [
      'Front control panel & voltage selector',
      'Top internal view of transformer & rectifier board',
      'Full angled view of metal enclosure',
    ],
    gallery: [
      photo('power-supply-220v-to-12v', 'front_view.jpg', 'Front Panel — Voltage Selector (3V–12V) & Output Binding Posts'),
      photo('power-supply-220v-to-12v', 'top_view.jpg', 'Top Internal View — Step-Down Transformer, Fuse & Regulator Board'),
      photo('power-supply-220v-to-12v', '01.jpg', 'Angled View — Completed 220V to 12V Power Supply in Metal Enclosure'),
    ],
  },
  {
    slug: 'seven-segment-counter',
    number: '04',
    kind: 'hardware',
    category: 'Digital Logic & Electronics',
    title: '7-Segment Display (0 to F & 0 to 9)',
    fullTitle: 'Digital Logic 7-Segment Display Circuits (0 to F & 0 to 9)',
    summary:
      'Two breadboard digital logic circuits built for Sir Meiko Rios’s course that drive a 7-segment LED display from 0 to F (hexadecimal) and from 0 to 9 (decimal) using logic gate ICs and DIP switch inputs.',
    description: [
      'Built for Sir Meiko Rios’s subject course, this digital logic project features two separate breadboard builds demonstrating combinational logic decoding on a single-digit 7-segment LED display: a 0 to F hexadecimal display circuit and a 0 to 9 decimal display circuit.',
      'Each circuit uses a 4-position DIP switch input stage, logic gate ICs, LED indicator arrays, current-limiting resistors, and structured color-coded jumper routing on solderless breadboards.',
    ],
    context: [
      { label: 'Instructor', value: 'Sir Meiko Rios' },
      { label: 'Circuits', value: '0 to F (Hex) · 0 to 9 (Decimal)' },
    ],
    status: 'completed',
    statusLabel: 'Academic Project',
    technologies: ['7-Segment LED Display', 'Digital Logic ICs', '4-Pos DIP Switch', 'Breadboard Prototyping'],
    documentation: [
      '0 to F (Hexadecimal) 7-segment display breadboard circuit',
      '0 to 9 (Decimal) 7-segment display breadboard circuit',
    ],
    gallery: [
      photo('seven-segment-counter', '01.jpg', '0 to F — Hexadecimal 7-Segment Display Logic Breadboard Circuit'),
      photo('seven-segment-counter', '02.jpg', '0 to 9 — Decimal 7-Segment Display Logic Breadboard Circuit'),
    ],
  },
  {
    slug: 'antenna-225-mhz',
    number: '05',
    kind: 'hardware',
    category: 'Communications Hardware',
    title: '225 MHz Directional Yagi-Uda Antenna',
    fullTitle: '225 MHz Multi-Element Directional Yagi-Uda Antenna',
    summary:
      'A custom-fabricated 225 MHz directional Yagi-Uda antenna with aluminum elements and coaxial feedline built for Engr. Ivanlee Mendoza’s course.',
    description: [
      'Designed and fabricated for Engr. Ivanlee Mendoza’s communications engineering course, this project is a physical multi-element directional Yagi-Uda antenna tuned for 225 MHz.',
      'The build features spaced parasitic director and reflector elements mounted along a central boom, a driven dipole element housing, and a coaxial transmission feedline with connector.',
    ],
    context: [
      { label: 'Instructor', value: 'Engr. Ivanlee Mendoza' },
      { label: 'Frequency', value: '225 MHz Directional' },
    ],
    status: 'completed',
    statusLabel: 'Academic Project',
    technologies: ['225 MHz Tuning', 'Yagi-Uda Array', 'Coaxial Feedline', 'Aluminum Elements'],
    requestDetailsNote:
      'Want to see the full list of components used, antenna diagram, and design computations? Send me an email to request them.',
    requestDetailsSubject: 'Requesting Full Components, Diagram & Computation — 225 MHz Yagi-Uda Antenna',
    documentation: [
      'Completed multi-element 225 MHz Yagi-Uda antenna assembly',
      'Coaxial feedline & boom mounting',
    ],
    gallery: [
      photo('antenna-225-mhz', '01.jpg', 'Full View — 225 MHz Multi-Element Directional Yagi-Uda Antenna & Coaxial Feed'),
    ],
  },
  {
    slug: 'smart-cane',
    number: '06',
    kind: 'hardware',
    category: 'Collaborative Embedded Prototype',
    title: 'Smart Cane Embedded Prototype',
    fullTitle: 'Smart Cane Assistive Embedded System (Collaborative Build with Joshua Lagare)',
    summary:
      'Assisted Joshua Lagare in building and wiring his Smart Cane embedded prototype featuring an Arduino Nano, OLED display, MP3 voice module, and rechargeable Li-ion power.',
    description: [
      'A hands-on collaborative embedded systems build where I helped my friend Joshua Lagare assemble, wire, and test his Smart Cane assistive prototype.',
      'The circuit integrates an Arduino Nano microcontroller, an I2C OLED status screen, a DFPlayer Mini MP3 audio module with microSD card and speaker for voice feedback, an LDR ambient light sensor, and a 3.7V 6000mAh Li-ion battery managed by a TP4056 charging module.',
    ],
    context: [
      { label: 'Collaboration', value: 'Assisted Joshua Lagare' },
      { label: 'Core Hardware', value: 'Arduino Nano · DFPlayer Mini · OLED' },
    ],
    status: 'completed',
    statusLabel: 'Collaborative Build',
    technologies: ['Arduino Nano', 'OLED Display', 'DFPlayer Mini MP3', 'LDR Sensor', 'TP4056 Li-Ion Charger'],
    requestDetailsNote:
      'Want to see the full list of components used, circuit diagram, and computations? Send me an email to request them.',
    requestDetailsSubject: 'Requesting Full Components, Diagram & Computation — Smart Cane',
    documentation: [
      'Full prototype integration with battery & speaker',
      'Close-up of Arduino Nano, OLED, and audio feedback wiring',
    ],
    gallery: [
      photo('smart-cane', '01.jpg', 'Full Prototype — Arduino Nano, OLED, DFPlayer Mini & Li-Ion Pack'),
      photo('smart-cane', '02.jpg', 'Close-Up View — Microcontroller, Sensor Modules & Audio Output Stage'),
    ],
  },
  {
    slug: 'rf-transmitter-150m',
    number: '07',
    kind: 'hardware',
    category: 'Collaborative FM Electronics',
    title: '100–150m Range FM Transmitter',
    fullTitle: '100 to 150 Meters Range FM Transmitter Circuit (Collaborative Build with Ken Catane)',
    summary:
      'Assisted Ken Catane in fabricating and soldering a compact custom-PCB FM transmitter circuit designed for a 100 to 150 meter transmission range.',
    description: [
      'A collaborative electronics build where I helped my friend Ken Catane fabricate and assemble his 100 to 150 meters range wireless FM transmitter.',
      'Built on a hand-etched single-sided copper-clad PCB, the circuit features a transistor FM oscillator stage, a hand-wound air-core inductor coil, an adjustable trimmer capacitor for frequency tuning, passive bias components, and a wire whip antenna.',
    ],
    context: [
      { label: 'Collaboration', value: 'Assisted Ken Catane' },
      { label: 'Target Range', value: '100 to 150 meters' },
    ],
    status: 'completed',
    statusLabel: 'Collaborative Build',
    technologies: ['Custom Copper PCB', 'FM Transistor Oscillator', 'Air-Core Inductor', 'Trimmer Capacitor'],
    requestDetailsNote:
      'Want to see the full list of components used, schematic diagram, and FM transmitter computations? Send me an email to request them.',
    requestDetailsSubject: 'Requesting Full Components, Diagram & Computation — 100–150m FM Transmitter',
    documentation: [
      'Front component side of custom PCB',
      'Rear hand-etched copper trace & solder side',
    ],
    gallery: [
      photo('rf-transmitter-150m', 'front_view.jpg', 'Component Side — Air-Core Coil, Trimmer Capacitor & FM Oscillator Stage'),
      photo('rf-transmitter-150m', 'back_view.jpg', 'Solder Side — Hand-Etched Copper PCB Traces'),
    ],
  },
  {
    slug: 'smart-shoe-care',
    number: '08',
    kind: 'hardware',
    category: 'Automation Prototype',
    title: 'Smart Shoe Care Vending System',
    fullTitle: 'Smart Shoe Care Vending System with Automated Cleaning, Drying and Scent Infusion',
    summary:
      'Ongoing project for our Project Design 1 subject under Engr. Ivanlee Mendoza — Not available for now.',
    description: [],
    context: [],
    status: 'ongoing',
    statusLabel: 'Ongoing — Project Design 1',
    technologies: [],
    documentation: [],
    gallery: [],
    unavailableNote:
      'Ongoing project for our Project Design 1 subject under Engr. Ivanlee Mendoza — Not available for now.',
  },
  {
    slug: 'icct-cslms',
    number: '09',
    kind: 'software',
    category: 'Desktop Software Application',
    title: 'ICCT Campus Supply Logistics Management System',
    fullTitle: 'ICCT Campus Supply Logistics Management System (ICCT CSLMS)',
    summary:
      '3rd-year academic software project under Sir Robin Gonzales — Not available for now.',
    description: [],
    context: [],
    status: 'completed',
    statusLabel: 'Academic Project',
    technologies: [],
    documentation: [],
    gallery: [],
    unavailableNote:
      '3rd-year academic software project under Sir Robin Gonzales — Not available for now.',
  },
];

/** Projects in their official numbered order, used for prev/next. */
export const projectsByNumber = [...projects].sort((a, b) => a.number.localeCompare(b.number));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
