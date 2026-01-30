/**
 * Project Data for Alpha Sign AG Portfolio
 * Contains sample projects with German and English translations
 */

export interface Project {
  slug: string;
  category: string;
  categoryKey: string;
  year: number;
  client: string;
  image: string;
  gallery: string[];
  de: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
  };
  en: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

export const categories = {
  de: [
    { key: 'all', label: 'Alle' },
    { key: 'fahrzeugbeschriftung', label: 'Fahrzeugbeschriftung' },
    { key: 'leuchtreklame', label: 'Leuchtreklame' },
    { key: 'signaletik', label: 'Signaletik' },
    { key: 'car-wrapping', label: 'Car Wrapping' },
    { key: 'gebaeudebeschriftung', label: 'Gebäudebeschriftung' },
    { key: 'messeauftritte', label: 'Messeauftritte' },
    { key: 'kunst-am-bau', label: 'Kunst am Bau' },
    { key: 'fine-art-prints', label: 'Fine Art Prints' },
  ],
  en: [
    { key: 'all', label: 'All' },
    { key: 'fahrzeugbeschriftung', label: 'Vehicle Graphics' },
    { key: 'leuchtreklame', label: 'Illuminated Signs' },
    { key: 'signaletik', label: 'Wayfinding' },
    { key: 'car-wrapping', label: 'Car Wrapping' },
    { key: 'gebaeudebeschriftung', label: 'Building Signage' },
    { key: 'messeauftritte', label: 'Trade Shows' },
    { key: 'kunst-am-bau', label: 'Art Installations' },
    { key: 'fine-art-prints', label: 'Fine Art Prints' },
  ],
};

export const projects: Project[] = [
  {
    slug: 'swiss-logistics-flotte',
    category: 'Fahrzeugbeschriftung',
    categoryKey: 'fahrzeugbeschriftung',
    year: 2024,
    client: 'Swiss Logistics AG',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'Flottenbeklebung Swiss Logistics',
      description: 'Vollständige Flottenbeklebung für 45 Nutzfahrzeuge mit einheitlichem Corporate Design.',
      challenge: 'Swiss Logistics AG benötigte eine einheitliche visuelle Identität für ihre gesamte Fahrzeugflotte von 45 Transportern und LKWs. Die Herausforderung bestand darin, ein Design zu entwickeln, das sowohl auf kleinen Lieferwagen als auch auf grossen Sattelzügen wirkt und dabei die Markenrichtlinien konsistent umsetzt.',
      solution: 'Wir entwickelten ein modulares Designsystem, das sich flexibel an verschiedene Fahrzeugtypen anpasst. Hochwertige Digitaldruckfolien garantieren Langlebigkeit und Farbbrillanz. Die Installation erfolgte in koordinierten Etappen, um den laufenden Betrieb nicht zu beeinträchtigen.',
      results: [
        '45 Fahrzeuge in 6 Wochen fertiggestellt',
        '30% mehr Markenwahrnehmung laut Kundenumfrage',
        '5 Jahre Garantie auf alle Folierungen',
        'Vollständige CI-Konformität über alle Fahrzeugtypen',
      ],
    },
    en: {
      title: 'Fleet Graphics Swiss Logistics',
      description: 'Complete fleet branding for 45 commercial vehicles with unified corporate design.',
      challenge: 'Swiss Logistics AG needed a unified visual identity for their entire vehicle fleet of 45 vans and trucks. The challenge was to develop a design that works on both small delivery vans and large semi-trucks while consistently implementing brand guidelines.',
      solution: 'We developed a modular design system that flexibly adapts to different vehicle types. High-quality digital print films guarantee durability and color brilliance. Installation was carried out in coordinated stages to avoid disrupting ongoing operations.',
      results: [
        '45 vehicles completed in 6 weeks',
        '30% increase in brand awareness according to customer survey',
        '5-year warranty on all wraps',
        'Complete CI compliance across all vehicle types',
      ],
    },
  },
  {
    slug: 'hotel-bellevue-leuchtschrift',
    category: 'Leuchtreklame',
    categoryKey: 'leuchtreklame',
    year: 2024,
    client: 'Hotel Bellevue Zug',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'LED-Leuchtschrift Hotel Bellevue',
      description: 'Elegante Dachbeschriftung mit energieeffizienter LED-Technologie für traditionsreiches Hotel.',
      challenge: 'Das historische Hotel Bellevue wünschte eine neue Dachbeschriftung, die den traditionellen Charakter des Gebäudes respektiert und gleichzeitig moderne Technologie nutzt. Besondere Anforderungen galten dem Denkmalschutz und der Integration in die Altstadt-Silhouette.',
      solution: 'Wir konzipierten eine klassische Leuchtschrift mit warmweissen LED-Modulen, die das historische Erscheinungsbild bewahrt. Die Buchstaben wurden aus eloxiertem Aluminium gefertigt und mit durchscheinenden Acrylfront versehen. Die Steuerung ermöglicht verschiedene Dimmstufen für Tag- und Nachtbetrieb.',
      results: [
        '70% weniger Energieverbrauch als alte Neonanlage',
        'Genehmigung durch Denkmalschutzbehörde',
        'Fernwartung und intelligente Steuerung integriert',
        'Lebensdauer der LEDs über 50.000 Stunden',
      ],
    },
    en: {
      title: 'LED Sign Hotel Bellevue',
      description: 'Elegant rooftop signage with energy-efficient LED technology for a traditional hotel.',
      challenge: 'The historic Hotel Bellevue wanted new rooftop signage that respects the traditional character of the building while utilizing modern technology. Special requirements applied to heritage protection and integration into the old town silhouette.',
      solution: 'We designed classic illuminated letters with warm white LED modules that preserve the historic appearance. The letters were made from anodized aluminum with translucent acrylic fronts. The control system enables different dimming levels for day and night operation.',
      results: [
        '70% less energy consumption than old neon system',
        'Approval from heritage protection authority',
        'Remote maintenance and smart controls integrated',
        'LED lifespan over 50,000 hours',
      ],
    },
  },
  {
    slug: 'kantonsspital-wegweiser',
    category: 'Signaletik',
    categoryKey: 'signaletik',
    year: 2023,
    client: 'Kantonsspital Zug',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'Leitsystem Kantonsspital Zug',
      description: 'Umfassendes Signaletik-Konzept für intuitive Patientenführung im erweiterten Klinikgebäude.',
      challenge: 'Nach der Erweiterung des Kantonsspitals um einen Neubau musste das bestehende Leitsystem komplett überarbeitet werden. Die Herausforderung lag in der Schaffung eines intuitiven Systems, das Menschen aller Altersgruppen und Sprachkenntnisse sicher durch das komplexe Gebäude führt.',
      solution: 'Wir entwickelten ein mehrsprachiges Leitsystem mit klarer Farbcodierung nach Funktionsbereichen. Piktogramme ergänzen die Textinformationen für internationale Besucher. Taktile Elemente und Braille-Beschriftungen gewährleisten Barrierefreiheit. Digitale Info-Terminals ergänzen die statische Beschilderung.',
      results: [
        'Über 500 Beschilderungselemente installiert',
        '40% weniger Nachfragen an der Information',
        'Vollständige Barrierefreiheit nach SIA 500',
        '4 Sprachen: Deutsch, Französisch, Italienisch, Englisch',
      ],
    },
    en: {
      title: 'Wayfinding System Cantonal Hospital Zug',
      description: 'Comprehensive signage concept for intuitive patient guidance in the expanded clinic building.',
      challenge: 'After the expansion of the cantonal hospital with a new building, the existing wayfinding system had to be completely revised. The challenge was to create an intuitive system that safely guides people of all ages and language skills through the complex building.',
      solution: 'We developed a multilingual wayfinding system with clear color coding by functional areas. Pictograms complement text information for international visitors. Tactile elements and Braille inscriptions ensure accessibility. Digital info terminals supplement the static signage.',
      results: [
        'Over 500 signage elements installed',
        '40% fewer inquiries at reception',
        'Full accessibility according to SIA 500',
        '4 languages: German, French, Italian, English',
      ],
    },
  },
  {
    slug: 'porsche-cayenne-vollfolierung',
    category: 'Car Wrapping',
    categoryKey: 'car-wrapping',
    year: 2024,
    client: 'Privatkundin',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'Porsche Cayenne Vollfolierung',
      description: 'Premium Car Wrapping in Satin Black mit Chromakzenten und Lackschutzfolierung.',
      challenge: 'Die Kundin wünschte eine komplette Farbveränderung ihres Porsche Cayenne von Weiss auf Satin Black, ohne den Originalzustand permanent zu verändern. Zusätzlich sollten ausgewählte Chromelemente akzentuiert und der gesamte Lack nachhaltig geschützt werden.',
      solution: 'Wir verwendeten Premium-Folien von Avery Dennison in Satin Black für die Hauptflächen und ergänzten diese mit hochglänzenden Chromakzenten an Spiegeln und Leisten. Der Frontbereich erhielt zusätzlich eine transparente Lackschutzfolie gegen Steinschlag. Die gesamte Arbeit erfolgte in unserer klimatisierten Folierungskabine.',
      results: [
        'Vollständige Farbumgestaltung in 5 Arbeitstagen',
        'Originalwert des Fahrzeugs erhalten',
        'Garantie auf Folierung: 7 Jahre',
        'PPF-Schutz für Front und Motorhaube',
      ],
    },
    en: {
      title: 'Porsche Cayenne Full Wrap',
      description: 'Premium car wrapping in Satin Black with chrome accents and paint protection film.',
      challenge: 'The customer wanted a complete color change of her Porsche Cayenne from white to Satin Black without permanently altering the original condition. Additionally, selected chrome elements should be accentuated and the entire paint protected sustainably.',
      solution: 'We used premium Avery Dennison films in Satin Black for the main surfaces and complemented these with high-gloss chrome accents on mirrors and trim. The front area also received transparent paint protection film against stone chips. All work was carried out in our climate-controlled wrapping booth.',
      results: [
        'Complete color transformation in 5 working days',
        'Original vehicle value preserved',
        'Wrap warranty: 7 years',
        'PPF protection for front and hood',
      ],
    },
  },
  {
    slug: 'techpark-zug-fassade',
    category: 'Gebäudebeschriftung',
    categoryKey: 'gebaeudebeschriftung',
    year: 2023,
    client: 'TechPark Zug AG',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'Fassadenbeschriftung TechPark Zug',
      description: 'Grossflächige Gebäudebeschriftung mit 3D-Buchstaben und integrierter LED-Hinterleuchtung.',
      challenge: 'Der neu errichtete TechPark Zug benötigte eine markante Gebäudekennzeichnung, die sowohl tagsüber als auch nachts Fernwirkung erzielt. Die moderne Glasfassade stellte besondere Anforderungen an die Befestigung und Integration der Beschilderung.',
      solution: 'Wir fertigten 1.2 Meter hohe 3D-Buchstaben aus Aluminium mit gebürstetem Edelstahl-Finish. Die Hinterleuchtung mit warmweissen LEDs erzeugt einen eleganten Halo-Effekt. Ein spezielles Montagesystem ermöglicht die sichere Befestigung an der Pfosten-Riegel-Fassade ohne Beschädigung der Verglasung.',
      results: [
        'Sichtbarkeit aus über 500 Metern Entfernung',
        'Wartungsfreie LED-Technik mit 10 Jahren Garantie',
        'Nahtlose Integration in Fassadenarchitektur',
        'Energieeffiziente Steuerung mit Dämmerungssensor',
      ],
    },
    en: {
      title: 'Building Signage TechPark Zug',
      description: 'Large-scale building signage with 3D letters and integrated LED backlighting.',
      challenge: 'The newly constructed TechPark Zug needed prominent building identification that achieves visibility both during the day and at night. The modern glass facade posed special requirements for the attachment and integration of the signage.',
      solution: 'We manufactured 1.2-meter high 3D letters from aluminum with brushed stainless steel finish. The backlighting with warm white LEDs creates an elegant halo effect. A special mounting system enables secure attachment to the curtain wall facade without damaging the glazing.',
      results: [
        'Visibility from over 500 meters distance',
        'Maintenance-free LED technology with 10-year warranty',
        'Seamless integration into facade architecture',
        'Energy-efficient control with twilight sensor',
      ],
    },
  },
  {
    slug: 'pharma-swiss-messestand',
    category: 'Messeauftritte',
    categoryKey: 'messeauftritte',
    year: 2024,
    client: 'PharmSwiss International',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'Messestand PharmSwiss International',
      description: 'Modularer Messestand für internationale Pharmamesse mit interaktiven Elementen.',
      challenge: 'PharmSwiss International präsentierte sich erstmals auf der grössten europäischen Pharmamesse und benötigte einen Messestand, der Innovation und Schweizer Qualität vermittelt. Der Stand musste modular aufgebaut sein, um bei verschiedenen Messen in unterschiedlichen Grössen eingesetzt werden zu können.',
      solution: 'Wir konzipierten einen modularen Messebau mit austauschbaren Grafikpaneelen und integrierten LED-Wänden. Interaktive Touchscreens ermöglichen Produktpräsentationen. Das System lässt sich von 50 bis 200 qm skalieren. Hochwertige Stoffgrafiken garantieren faltenfreie Grossflächen und einfachen Transport.',
      results: [
        'Über 3.000 Besucherkontakte während der Messe',
        'Wiederverwendbar für 5 verschiedene Messegrössen',
        'Aufbauzeit unter 8 Stunden',
        'CO2-neutraler Transport und Lagerung',
      ],
    },
    en: {
      title: 'Trade Show Booth PharmSwiss International',
      description: 'Modular exhibition stand for international pharmaceutical fair with interactive elements.',
      challenge: 'PharmSwiss International was presenting for the first time at the largest European pharmaceutical fair and needed an exhibition stand that conveys innovation and Swiss quality. The stand had to be modular to be used at various trade shows in different sizes.',
      solution: 'We designed a modular trade show system with interchangeable graphic panels and integrated LED walls. Interactive touchscreens enable product presentations. The system scales from 50 to 200 sqm. High-quality fabric graphics guarantee wrinkle-free large surfaces and easy transport.',
      results: [
        'Over 3,000 visitor contacts during the fair',
        'Reusable for 5 different trade show sizes',
        'Setup time under 8 hours',
        'Carbon-neutral transport and storage',
      ],
    },
  },
  {
    slug: 'kunstinstallation-versicherung',
    category: 'Kunst am Bau',
    categoryKey: 'kunst-am-bau',
    year: 2023,
    client: 'Helvetia Versicherung',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'Lichtskulptur Helvetia Hauptsitz',
      description: 'Monumentale Lichtskulptur im Eingangsbereich des Versicherungshauptsitzes.',
      challenge: 'Helvetia Versicherung suchte ein künstlerisches Herzstück für die renovierte Eingangshalle. Die Installation sollte die Unternehmenswerte Vertrauen und Sicherheit visualisieren und gleichzeitig als architektonisches Highlight fungieren.',
      solution: 'In Zusammenarbeit mit dem Künstler Marco Fontana entwickelten wir eine schwebende Lichtskulptur aus 2.500 individuell ansteuerbaren LED-Elementen. Die Skulptur reagiert auf Bewegungen im Raum und erzeugt fliessende Lichtmuster, die an schützende Hände erinnern.',
      results: [
        'Kunstwerk mit 2.500 programmierbaren LED-Punkten',
        'Interaktive Reaktion auf Besucherbewegungen',
        'Präzise Umsetzung der künstlerischen Vision',
        'Wartungsarme Technik mit 15 Jahren Garantie',
      ],
    },
    en: {
      title: 'Light Sculpture Helvetia Headquarters',
      description: 'Monumental light sculpture in the entrance area of the insurance headquarters.',
      challenge: 'Helvetia Insurance was looking for an artistic centerpiece for the renovated entrance hall. The installation was to visualize the corporate values of trust and security while functioning as an architectural highlight.',
      solution: 'In collaboration with artist Marco Fontana, we developed a floating light sculpture made of 2,500 individually controllable LED elements. The sculpture responds to movement in the space and creates flowing light patterns reminiscent of protective hands.',
      results: [
        'Artwork with 2,500 programmable LED points',
        'Interactive response to visitor movement',
        'Precise implementation of artistic vision',
        'Low-maintenance technology with 15-year warranty',
      ],
    },
  },
  {
    slug: 'schweizer-alpen-edition',
    category: 'Fine Art Prints',
    categoryKey: 'fine-art-prints',
    year: 2024,
    client: 'Galerie Zuger See',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    ],
    de: {
      title: 'Fotografie-Edition "Schweizer Alpen"',
      description: 'Limitierte Fine Art Print Edition für renommierte Zuger Galerie.',
      challenge: 'Der bekannte Landschaftsfotograf Hans Ritter benötigte einen Partner für die Produktion seiner ersten limitierten Galerie-Edition. Die 50 grossformatigen Prints mussten höchsten Qualitätsansprüchen genügen und identische Farbwiedergabe über die gesamte Auflage garantieren.',
      solution: 'Wir druckten die Edition auf Hahnemühle Photo Rag 308g mit unserer kalibrierten Epson-Technologie. Jeder Print wurde individuell geprüft und mit Echtheitszertifikat versehen. Die Archivierung der Druckdateien ermöglicht identische Nachdrucke auch in Jahren.',
      results: [
        '50 nummerierte und signierte Prints',
        'Formate von 60x90 cm bis 150x200 cm',
        '100+ Jahre Farbbeständigkeit garantiert',
        'Alle Prints innerhalb von 48 Stunden ausverkauft',
      ],
    },
    en: {
      title: 'Photography Edition "Swiss Alps"',
      description: 'Limited Fine Art Print edition for renowned Zug gallery.',
      challenge: 'Renowned landscape photographer Hans Ritter needed a partner for the production of his first limited gallery edition. The 50 large-format prints had to meet the highest quality standards and guarantee identical color reproduction across the entire run.',
      solution: 'We printed the edition on Hahnemuhle Photo Rag 308g with our calibrated Epson technology. Each print was individually inspected and provided with a certificate of authenticity. The archiving of print files enables identical reprints even years later.',
      results: [
        '50 numbered and signed prints',
        'Formats from 60x90 cm to 150x200 cm',
        '100+ years color fastness guaranteed',
        'All prints sold out within 48 hours',
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  const currentProject = getProjectBySlug(currentSlug);
  if (!currentProject) return [];

  return projects
    .filter((project) =>
      project.slug !== currentSlug &&
      project.categoryKey === currentProject.categoryKey
    )
    .slice(0, limit);
}

export function getProjectsByCategory(categoryKey: string): Project[] {
  if (categoryKey === 'all') return projects;
  return projects.filter((project) => project.categoryKey === categoryKey);
}
