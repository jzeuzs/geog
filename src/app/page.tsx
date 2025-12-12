"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

interface StickyScrollSectionProps {
    section: {
        id: string;
        title: string;
        subtitle: string;
        theme: {
            bg: string;
            textPrimary: string;
            textSecondary: string;
            accent: string;
            font: string;
            titleFont: string;
            visual: string;
        };
        content: React.ReactNode;
    };
    index: number;
}

function StickyScrollSection({ section, index }: StickyScrollSectionProps) {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 10]);

    return (
        <section
            ref={sectionRef}
            className={`relative ${section.theme.bg}`}
            style={{ minHeight: "150vh" }}
        >
            <div className="sticky top-0 h-screen">
                <motion.div
                    className="h-full flex flex-col md:grid md:grid-cols-2 gap-0"
                    style={{ opacity }}
                >
                    <div className="relative overflow-hidden bg-black/20 h-1/3 md:h-full">
                        <motion.div
                            className="absolute inset-0"
                            style={{ scale }}
                        >
                            <motion.div
                                style={{
                                    filter: blur.get()
                                        ? `blur(${blur.get()}px)`
                                        : "none",
                                }}
                            >
                                <Image
                                    src={
                                        section.theme.visual ||
                                        "/placeholder.svg"
                                    }
                                    alt={section.title}
                                    fill
                                    className="object-cover opacity-80"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-transparent to-black/60" />
                        </motion.div>

                        <motion.div
                            className="absolute top-4 left-4 md:top-12 md:left-12 z-10"
                            initial={{ opacity: 0, x: -50, rotate: -10 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{
                                duration: 1,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.span
                                className={`text-5xl md:text-9xl font-bold ${section.theme.textSecondary} opacity-30 inline-block`}
                                whileHover={{ scale: 1.1, opacity: 0.5 }}
                                transition={{ duration: 0.3 }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </motion.span>
                        </motion.div>
                    </div>

                    <div
                        className={`flex-1 md:h-screen overflow-y-scroll scrollbar-hide ${section.theme.bg} p-4 md:p-8 lg:p-16`}
                    >
                        <div className="max-w-2xl mx-auto pb-12 md:pb-24">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <motion.h2
                                    className={`text-3xl md:text-4xl lg:text-6xl font-bold ${section.theme.textPrimary} mb-3 md:mb-4 leading-tight md:leading-none tracking-tighter ${section.theme.titleFont}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {section.title}
                                </motion.h2>

                                <motion.p
                                    className={`text-xs md:text-sm ${section.theme.textSecondary} mb-6 md:mb-8 font-mono uppercase tracking-wider`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    {section.subtitle}
                                </motion.p>

                                <motion.div
                                    className={`h-px w-16 md:w-24 mb-6 md:mb-8`}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.5,
                                        ease: "easeOut",
                                    }}
                                    viewport={{ once: true }}
                                    style={{
                                        backgroundColor: `var(--color-${section.theme.accent})`,
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                className={section.theme.font}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {section.content}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default function Page() {
    const sections = [
        {
            id: "mental-map",
            title: "THE MENTAL MAP VS. THE APP",
            subtitle: "Cognitive Cartography and Spatial Perception",
            theme: {
                bg: "bg-black",
                textPrimary: "text-cyan-50",
                textSecondary: "text-cyan-400",
                accent: "cyan-400",
                font: "font-mono",
                titleFont: "font-sans",
                visual: "/1.png",
            },
            content: (
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-cyan-300 font-bold text-sm uppercase tracking-wider">
                            The Epistemological Crisis of Modern Wayfinding
                        </h3>
                        <p className="text-cyan-100 text-base leading-relaxed font-mono">
                            In the contemporary urban experience, the act of
                            navigation has been increasingly offloaded to
                            algorithmic authorities. The reliance on Global
                            Positioning System (GPS) applications such as Google
                            Maps and Waze has altered the relationship between
                            the human subject and the physical terrain.
                        </p>
                        <p className="text-cyan-100 text-sm leading-relaxed font-mono">
                            These tools present space as a Euclidean reality: a
                            continuous, measurable, and objective grid where
                            distance is a function of mathematics and time is a
                            function of traffic algorithms. However, this
                            "cartographic map" often stands in contrast to the
                            "mental map" (or cognitive map), the internal
                            representation of space held within the mind of the
                            individual.
                        </p>
                        <p className="text-cyan-100 text-sm leading-relaxed font-mono">
                            While digital maps provide objective accuracy, the
                            mental map reveals the "emotional geography" of
                            daily life. As geographers argue, the transformation
                            of abstract "space" into meaningful "place" occurs
                            through sustained human interaction.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-cyan-300 font-bold text-sm uppercase tracking-wider">
                            Lynchian Analysis and the Nature of Imageability
                        </h3>
                        <p className="text-cyan-100 text-sm leading-relaxed font-mono">
                            To understand the architecture of the mental map,
                            one must turn to the foundational work of Kevin
                            Lynch. In his text{" "}
                            <span className="italic">
                                The Image of the City
                            </span>{" "}
                            (1960), Lynch argued that an individual's mental map
                            is constructed through the interaction between the
                            observer and the environment.
                        </p>
                        <p className="text-cyan-100 text-sm leading-relaxed font-mono">
                            He identified five distinct elements that constitute
                            the structural skeleton of a mental map:
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider">
                            Lynch's Five Elements
                        </h4>
                        <div className="grid gap-3">
                            {[
                                {
                                    term: "Paths",
                                    definition:
                                        "The channels along which the observer customarily, occasionally, or potentially moves",
                                    digital: "Lines of constant width on a map",
                                    mental: "A path might be narrow, jagged, or psychologically arduous due to the 'friction' of anxiety (e.g., the walk to a difficult exam)",
                                },
                                {
                                    term: "Edges",
                                    definition:
                                        "Linear elements not used or considered as paths by the observer",
                                    digital:
                                        "Clear boundary lines between areas",
                                    mental: "A busy highway may feel like a solid wall that creates a 'dead zone' behind it, even if the map shows streets continuing through",
                                },
                                {
                                    term: "Nodes",
                                    definition:
                                        "Strategic points, the intensive foci to and from which the observer is traveling",
                                    digital:
                                        "Simple intersection markers or pins",
                                    mental: "Intensive points of activity and decision-making (e.g., a specific waiting shed, a smoking area, the 'Good Siomai Spot')",
                                },
                                {
                                    term: "Districts",
                                    definition:
                                        "Medium-to-large sections of the city with some common, identifying character",
                                    digital:
                                        "Named areas with labeled boundaries",
                                    mental: "Emotionally distinct zones perceived as regions of comfort, stress, or neutrality",
                                },
                                {
                                    term: "Landmarks",
                                    definition:
                                        "Point references; external to the observer, used in wayfinding",
                                    digital: "Generic location pins with names",
                                    mental: "Deeply personal reference points imbued with memory and significance (e.g., 'the tree where I cried')",
                                },
                            ].map((element) => (
                                <div
                                    key={element.term}
                                    className="border border-cyan-500/30 bg-cyan-950/20 p-5"
                                >
                                    <h5 className="font-bold text-cyan-300 mb-2 text-sm uppercase tracking-wider">
                                        {element.term}
                                    </h5>
                                    <p className="text-cyan-200 text-xs font-mono mb-3 italic">
                                        {element.definition}
                                    </p>
                                    <div className="space-y-2 text-xs font-mono">
                                        <div className="bg-cyan-950/40 p-3 rounded">
                                            <span className="text-cyan-400 font-bold">
                                                Digital Map:
                                            </span>{" "}
                                            <span className="text-cyan-100">
                                                {element.digital}
                                            </span>
                                        </div>
                                        <div className="bg-cyan-900/40 p-3 rounded">
                                            <span className="text-cyan-400 font-bold">
                                                Mental Map:
                                            </span>{" "}
                                            <span className="text-cyan-100">
                                                {element.mental}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-cyan-300 font-bold text-sm uppercase tracking-wider">
                            The Algorithm vs. The Sketch
                        </h3>
                        <p className="text-cyan-100 text-sm font-mono leading-relaxed">
                            The disparity becomes clear when we imagine and
                            compare a screenshot of a digital route with a
                            hand-drawn sketch. The digital map presents the
                            campus as a seamless continuum. Every building is
                            labeled with equal font size.
                        </p>
                        <p className="text-cyan-100 text-sm font-mono leading-relaxed">
                            Conversely, the hand-drawn map is fragmentary:
                        </p>
                    </div>

                    <div className="border border-cyan-500/30 bg-cyan-950/40 p-6 space-y-4">
                        <div>
                            <h4 className="text-cyan-300 font-bold text-sm mb-2">
                                Scale Distortion
                            </h4>
                            <p className="text-cyan-100 text-sm font-mono leading-relaxed">
                                The dormitory and the "Good Siomai Spot" are
                                drawn disproportionately large, occupying
                                perhaps 40% of the paper surface. This reflects
                                their significance as Nodes of comfort and
                                biological sustenance.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-cyan-300 font-bold text-sm mb-2">
                                Selective Omission
                            </h4>
                            <p className="text-cyan-100 text-sm font-mono leading-relaxed">
                                Meanwhile, vast areas of the
                                campus—administrative buildings or parking
                                lots—are completely absent. This is the "terra
                                incognita" of daily life; the mental map only
                                records what is lived.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-cyan-300 font-bold text-sm mb-2">
                                Emotional Annotation
                            </h4>
                            <p className="text-cyan-100 text-sm font-mono leading-relaxed">
                                Certain Paths may be drawn with jagged lines or
                                darkened pencil strokes, suggesting routes
                                associated with stress (e.g., "The Long Walk to
                                8 AM Math"). This reveals the "psychogeographic"
                                layer absent from algorithmic representation.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-cyan-300 font-bold text-sm uppercase tracking-wider">
                            The Subjectivity of the Landscape
                        </h3>
                        <p className="text-cyan-100 text-sm font-mono leading-relaxed">
                            The comparison confirms that human perception of
                            space is fundamentally subjective. The digital map
                            is a tool of transit; the mental map is a record of
                            dwelling.
                        </p>
                    </div>

                    <div className="border-t border-cyan-500/20 pt-6">
                        <p className="text-cyan-300 text-base font-mono italic">
                            We do not live in a world of meters and minutes, but
                            in a world of anxieties, pleasures, and memories.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "microclimate",
            title: "THE MICROCLIMATES OF COMMUTING",
            subtitle: "Anthropogenic Heat and Urban Design",
            theme: {
                bg: "bg-gradient-to-br from-red-950 via-orange-900 to-amber-950",
                textPrimary: "text-orange-50",
                textSecondary: "text-orange-300",
                accent: "orange-400",
                font: "font-serif",
                titleFont: "font-serif",
                visual: "/2.png",
            },
            content: (
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-orange-300 font-bold text-sm uppercase tracking-wider">
                            The Atmospheric Transition
                        </h3>
                        <p className="text-orange-50 text-base leading-relaxed font-serif">
                            The daily commute is often conceptualized as
                            movement through distance, but geographically, it is
                            a movement through distinct atmospheric zones.
                            Within the span of a few meters, a pedestrian can
                            traverse environments that differ radically in
                            temperature and air quality.
                        </p>
                        <p className="text-orange-50 text-sm leading-relaxed font-serif">
                            We analyze the sensory experience of the
                            "Microclimate," specifically the transition from a
                            vegetated "Green Zone" to a paved "Concrete Zone."
                            This is the localized manifestation of the Urban
                            Heat Island (UHI) effect.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-orange-300 font-bold text-sm uppercase tracking-wider">
                            The Observation: A Tale of Two Zones
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="font-bold text-green-300 text-lg font-serif">
                                The Green Zone
                            </h4>
                            <div className="border border-green-500/30 bg-green-950/40 p-5 space-y-3">
                                <p className="text-green-100 text-sm font-serif leading-relaxed">
                                    Typified by areas like the Academic Oval in
                                    UP Diliman, this zone is characterized by
                                    mature trees and unsealed soil. As the
                                    commuter enters, there is a noticeable drop
                                    in thermal stress.
                                </p>
                                <div className="space-y-2">
                                    <p className="text-green-200 text-xs font-serif font-bold">
                                        Sensory Characteristics:
                                    </p>
                                    <ul className="space-y-1 text-green-200 text-xs font-serif list-disc list-inside ml-2">
                                        <li>
                                            Temperature drop of 3-5°C compared
                                            to adjacent concrete areas
                                        </li>
                                        <li>
                                            Dappled shade creating cool pockets
                                        </li>
                                        <li>
                                            Sensation of moving air (enhanced by
                                            transpiration)
                                        </li>
                                        <li>
                                            Softer ambient sound (leaves absorb
                                            noise)
                                        </li>
                                        <li>Visual relief from harsh glare</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-bold text-red-300 text-lg font-serif">
                                The Concrete Zone
                            </h4>
                            <div className="border border-red-500/30 bg-red-950/40 p-5 space-y-3">
                                <p className="text-red-100 text-sm font-serif leading-relaxed">
                                    Typified by open parking lots or highways.
                                    Stepping into this zone feels like walking
                                    into a wall of heat. The heat is
                                    omnidirectional—beating down from the sun
                                    and radiating up from the pavement.
                                </p>
                                <div className="space-y-2">
                                    <p className="text-red-200 text-xs font-serif font-bold">
                                        Sensory Characteristics:
                                    </p>
                                    <ul className="space-y-1 text-red-200 text-xs font-serif list-disc list-inside ml-2">
                                        <li>
                                            Surface temperature of asphalt:
                                            50-60°C on sunny days
                                        </li>
                                        <li>
                                            Harsh, unfiltered sunlight causing
                                            squinting
                                        </li>
                                        <li>
                                            Stagnant, heavy air with no breeze
                                        </li>
                                        <li>
                                            Heat shimmer rising from pavement
                                        </li>
                                        <li>
                                            Amplified traffic noise from hard
                                            surfaces
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-orange-300 font-bold text-sm uppercase tracking-wider">
                            The Physics of Urban Heat
                        </h3>
                        <p className="text-orange-50 text-sm font-serif leading-relaxed">
                            The difference between these zones is a function of
                            physics and urban design, specifically{" "}
                            <span className="font-bold">Albedo</span> and{" "}
                            <span className="font-bold">
                                Evapotranspiration
                            </span>
                            .
                        </p>
                    </div>

                    <div className="border border-orange-500/30 bg-orange-950/20 p-6 space-y-6">
                        <div>
                            <h4 className="text-orange-300 font-bold text-sm mb-3 uppercase tracking-wider">
                                The Albedo Effect
                            </h4>
                            <p className="text-orange-100 text-sm font-serif leading-relaxed mb-3">
                                <span className="font-bold">Albedo</span> is the
                                measure of surface reflectivity—the percentage
                                of solar radiation that bounces back into space
                                rather than being absorbed. It ranges from 0
                                (perfect absorption) to 1 (perfect reflection).
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 text-xs font-serif">
                                <div className="bg-red-950/40 p-4 rounded">
                                    <p className="text-red-300 font-bold mb-2">
                                        Low Albedo (Concrete/Asphalt)
                                    </p>
                                    <p className="text-red-100 mb-2">
                                        Albedo: 0.05 - 0.20
                                    </p>
                                    <p className="text-red-200 leading-relaxed">
                                        Acts as "black body" absorbing 80-95% of
                                        solar radiation, converting it to
                                        sensible heat and re-radiating
                                        throughout the day and night.
                                    </p>
                                </div>
                                <div className="bg-green-950/40 p-4 rounded">
                                    <p className="text-green-300 font-bold mb-2">
                                        Higher Albedo (Vegetation)
                                    </p>
                                    <p className="text-green-100 mb-2">
                                        Albedo: 0.15 - 0.25
                                    </p>
                                    <p className="text-green-200 leading-relaxed">
                                        Reflects more light and scatters solar
                                        energy. The irregular surface of leaves
                                        creates diffuse reflection rather than
                                        direct absorption.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-orange-300 font-bold text-sm mb-3 uppercase tracking-wider">
                                Evapotranspiration
                            </h4>
                            <p className="text-orange-100 text-sm font-serif leading-relaxed mb-3">
                                The most critical differentiator is water. This
                                is where the Green Zone achieves its true
                                cooling power.
                            </p>
                            <div className="space-y-3">
                                <div className="bg-green-950/60 p-4 rounded">
                                    <p className="text-green-200 font-bold mb-2 text-sm">
                                        In the Green Zone:
                                    </p>
                                    <p className="text-green-100 text-xs font-serif leading-relaxed">
                                        Trees engage in{" "}
                                        <span className="font-bold">
                                            evapotranspiration
                                        </span>
                                        , the process of absorbing water from
                                        the soil through roots and releasing it
                                        as vapor through stomata (leaf pores).
                                        This phase change from liquid to gas
                                        consumes enormous amounts of solar
                                        energy as{" "}
                                        <span className="font-bold">
                                            latent heat flux
                                        </span>{" "}
                                        (energy used for evaporation) rather
                                        than{" "}
                                        <span className="font-bold">
                                            sensible heat flux
                                        </span>{" "}
                                        (energy that heats the air). A single
                                        mature tree can transpire 100+ gallons
                                        of water per day, functioning as a
                                        biological air conditioner.
                                    </p>
                                </div>
                                <div className="bg-red-950/60 p-4 rounded">
                                    <p className="text-red-200 font-bold mb-2 text-sm">
                                        In the Concrete Zone:
                                    </p>
                                    <p className="text-red-100 text-xs font-serif leading-relaxed">
                                        Surfaces are impermeable. Rainwater runs
                                        off into drains rather than being stored
                                        in soil. Without moisture to evaporate,
                                        100% of the absorbed solar energy is
                                        converted to sensible heat, directly
                                        heating the air and "cooking" the
                                        pedestrian. The surface remains dry and
                                        hot, with no cooling mechanism.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-orange-300 font-bold text-sm uppercase tracking-wider">
                            The Politics of Shade
                        </h3>
                        <p className="text-orange-50 text-sm font-serif leading-relaxed">
                            The microclimate of the commute reveals that thermal
                            comfort is a product of planning decisions. The
                            "Concrete Zone" represents a landscape designed for
                            the machine (impermeable, durable, efficient for
                            vehicles) at the expense of the human organism.
                        </p>
                        <p className="text-orange-50 text-sm font-serif leading-relaxed">
                            The tree is infrastructure. The differential
                            experience of these microclimates demonstrates that
                            geography is constructed through choices about
                            materials, vegetation, and water management.
                        </p>
                    </div>

                    <div className="border-t border-orange-500/20 pt-6">
                        <p className="text-orange-300 text-base font-serif italic">
                            Thermal comfort is a product of planning; the
                            Concrete Zone is a landscape designed for the
                            machine at the expense of the human organism.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "breakfast",
            title: "THE GEOGRAPHY OF BREAKFAST",
            subtitle: "Global Supply Chains and Food Miles",
            theme: {
                bg: "bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100",
                textPrimary: "text-amber-950",
                textSecondary: "text-amber-700",
                accent: "amber-600",
                font: "font-sans",
                titleFont: "font-sans",
                visual: "/3.png",
            },
            content: (
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-amber-700 font-bold text-sm uppercase tracking-wider">
                            The Plate as a Map of the World
                        </h3>
                        <p className="text-amber-950 text-base leading-relaxed">
                            A seemingly simple breakfast (corned beef, garlic
                            rice, and coffee) appears to be a locally rooted
                            meal. However, a geographic dissection reveals it is
                            an assembly of commodities, each ingredient tracing
                            across oceans and continents.
                        </p>
                        <p className="text-amber-900 text-sm leading-relaxed">
                            This meal serves as an entry point into the study of
                            Global Supply Chains and the concept of "Food
                            Miles," revealing the geography embedded in the act
                            of eating.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-amber-700 font-bold text-sm uppercase tracking-wider">
                            Tracing the Origins: A Spatial Analysis
                        </h3>

                        <div className="space-y-4">
                            <div className="border border-amber-300 bg-white/70 p-5">
                                <h4 className="text-amber-900 font-bold mb-3 text-lg">
                                    The Corned Beef
                                </h4>
                                <p className="text-amber-800 text-sm leading-relaxed mb-3">
                                    While the brand may be local (e.g.,
                                    Purefoods, Argentina), the meat often isn't.
                                    The Philippines imports vast quantities of
                                    "carabeef" (water buffalo meat) from India
                                    due to lower production costs and trade
                                    agreements.
                                </p>
                                <div className="bg-amber-50 p-3 rounded space-y-1 text-xs">
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Origin:
                                        </span>{" "}
                                        Livestock farms in Maharashtra or Uttar
                                        Pradesh, India
                                    </p>
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Processing:
                                        </span>{" "}
                                        Slaughterhouses and canning facilities
                                        in Mumbai or Chennai
                                    </p>
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Transport:
                                        </span>{" "}
                                        Shipped via bulk cargo carriers to
                                        Manila Port
                                    </p>
                                    <p className="text-amber-800 font-bold mt-2">
                                        Estimated Distance: ~4,800 km
                                    </p>
                                </div>
                            </div>

                            <div className="border border-amber-300 bg-white/70 p-5">
                                <h4 className="text-amber-900 font-bold mb-3 text-lg">
                                    The Rice
                                </h4>
                                <p className="text-amber-800 text-sm leading-relaxed mb-3">
                                    Despite the Philippines being an
                                    agricultural archipelago with a historical
                                    rice culture, domestic production often
                                    cannot meet demand. Much of the rice
                                    consumed likely originated in the Mekong
                                    Delta of Vietnam or Thailand.
                                </p>
                                <div className="bg-amber-50 p-3 rounded space-y-1 text-xs">
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Origin:
                                        </span>{" "}
                                        Paddy fields in the Mekong Delta,
                                        Vietnam
                                    </p>
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Processing:
                                        </span>{" "}
                                        Milling facilities near Ho Chi Minh City
                                        or Can Tho
                                    </p>
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Transport:
                                        </span>{" "}
                                        Bulk carriers to Manila, then trucks to
                                        local markets
                                    </p>
                                    <p className="text-amber-800 font-bold mt-2">
                                        Estimated Distance: ~1,700 km
                                    </p>
                                </div>
                            </div>

                            <div className="border border-amber-300 bg-white/70 p-5">
                                <h4 className="text-amber-900 font-bold mb-3 text-lg">
                                    The Coffee
                                </h4>
                                <p className="text-amber-800 text-sm leading-relaxed mb-3">
                                    If consuming an instant "3-in-1" mix (a
                                    staple in Filipino households), the Robusta
                                    coffee beans likely traveled from Vietnam or
                                    Indonesia, were processed in a regional
                                    manufacturing hub, and then repackaged
                                    locally with sugar and creamer.
                                </p>
                                <div className="bg-amber-50 p-3 rounded space-y-1 text-xs">
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Coffee Beans:
                                        </span>{" "}
                                        Robusta plantations in Central
                                        Highlands, Vietnam
                                    </p>
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Sugar:
                                        </span>{" "}
                                        Possibly from Thailand or Brazil
                                        sugarcane plantations
                                    </p>
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Creamer:
                                        </span>{" "}
                                        Palm oil from Malaysia/Indonesia + dairy
                                        powder from New Zealand
                                    </p>
                                    <p className="text-amber-700">
                                        <span className="font-bold">
                                            Processing:
                                        </span>{" "}
                                        Regional facility in Singapore or Manila
                                    </p>
                                    <p className="text-amber-800 font-bold mt-2">
                                        Estimated Distance: ~1,200+ km (beans
                                        alone)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-amber-700 font-bold text-sm uppercase tracking-wider">
                            Globalization and Logistics
                        </h3>
                        <p className="text-amber-900 text-sm leading-relaxed">
                            This breakfast demonstrates the efficiency (and
                            paradoxes) of Globalization. International trade
                            agreements, containerization, and economies of scale
                            allow food to be transported across oceans at a
                            fraction of the cost of local production.
                        </p>
                    </div>

                    <div className="border border-amber-400 bg-amber-50 p-6 space-y-4">
                        <div>
                            <h4 className="text-amber-800 font-bold text-sm mb-2">
                                The Paradox
                            </h4>
                            <p className="text-amber-900 text-sm leading-relaxed">
                                It creates an economic anomaly where meat
                                shipped 4,800 km from India is cheaper than beef
                                raised in a neighboring province. This is not
                                due to quality, but to:
                            </p>
                            <ul className="mt-2 space-y-1 text-amber-800 text-xs list-disc list-inside ml-2">
                                <li>
                                    Economies of scale in industrial agriculture
                                </li>
                                <li>
                                    Lower labor costs in exporting countries
                                </li>
                                <li>Efficiency of bulk maritime shipping</li>
                                <li>Trade agreements reducing tariffs</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-amber-800 font-bold text-sm mb-2">
                                Food Miles Calculation
                            </h4>
                            <p className="text-amber-900 text-sm leading-relaxed mb-3">
                                The concept of "Food Miles" measures the total
                                distance food travels from production to
                                consumption. This seemingly local breakfast:
                            </p>
                            <div className="bg-amber-900 text-amber-100 p-5 text-center rounded">
                                <p className="text-3xl font-bold mb-1">
                                    ~6,000+ km
                                </p>
                                <p className="text-xs uppercase tracking-wider">
                                    Total Food Miles per Single Meal
                                </p>
                                <p className="text-xs mt-2 opacity-80">
                                    (4,800 km beef + 1,700 km rice + 1,200 km
                                    coffee beans + processing/distribution)
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-amber-800 font-bold text-sm mb-2">
                                The Hidden Geography
                            </h4>
                            <p className="text-amber-900 text-sm leading-relaxed">
                                This highlights the "invisible geography" of
                                consumption. Every bite connects the student to:
                            </p>
                            <ul className="mt-2 space-y-1 text-amber-800 text-xs list-disc list-inside ml-2">
                                <li>
                                    The water politics and dam systems of the
                                    Mekong River
                                </li>
                                <li>
                                    The livestock regulations and religious
                                    export laws of India
                                </li>
                                <li>
                                    The labor conditions of Vietnamese coffee
                                    harvesters
                                </li>
                                <li>
                                    The carbon footprint of transoceanic
                                    shipping routes
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: "third-places",
            title: '"THIRD PLACES" AND STUDENT CULTURE',
            subtitle: "The Sociological Necessity of Place",
            theme: {
                bg: "bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950",
                textPrimary: "text-emerald-50",
                textSecondary: "text-emerald-300",
                accent: "emerald-400",
                font: "font-sans",
                titleFont: "font-sans",
                visual: "/4.png",
            },
            content: (
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                            The Sociological Necessity of Place
                        </h3>
                        <p className="text-emerald-50 text-base leading-relaxed">
                            In the structured life of a student, space is
                            rigorously categorized into the First Place
                            (home/dormitory) and the Second Place
                            (classroom/workplace). However, for a community to
                            thrive, socially, emotionally, and culturally, it
                            requires a "Third Place."
                        </p>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                            This concept, defined by sociologist Ray Oldenburg
                            in his work{" "}
                            <span className="italic">The Great Good Place</span>{" "}
                            (1989), describes settings for informal public life
                            that exist outside the home and work. For the
                            university student, spaces like the Sunken Garden
                            serve this critical function.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {[
                            {
                                place: "1st Place",
                                name: "Home / Dormitory",
                                desc: "Private, personal, family space where one resides",
                                color: "blue",
                                char: "Intimate, secure",
                            },
                            {
                                place: "2nd Place",
                                name: "Work / School",
                                desc: "Structured, hierarchical, productive environment",
                                color: "orange",
                                char: "Formal, goal-oriented",
                            },
                            {
                                place: "3rd Place",
                                name: "Community Space",
                                desc: "Neutral, inclusive, social gathering point",
                                color: "emerald",
                                char: "Voluntary, egalitarian",
                            },
                        ].map((item) => (
                            <div
                                key={item.place}
                                className={`border border-${item.color}-500/30 bg-${item.color}-950/40 p-5 rounded`}
                            >
                                <p
                                    className={`font-bold text-${item.color}-300 mb-1 text-xs uppercase tracking-wider`}
                                >
                                    {item.place}
                                </p>
                                <p
                                    className={`text-${item.color}-100 font-bold mb-2 text-lg`}
                                >
                                    {item.name}
                                </p>
                                <p
                                    className={`text-${item.color}-200 text-xs mb-3`}
                                >
                                    {item.desc}
                                </p>
                                <p
                                    className={`text-${item.color}-300 text-xs italic`}
                                >
                                    {item.char}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                            Description and Cultural Analysis
                        </h3>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                            The Sunken Garden is a physical depression in the
                            landscape that acts as a natural amphitheater. Its
                            "sunken" nature provides acoustic and visual
                            separation from street noise while maintaining
                            connectivity to surrounding spaces.
                        </p>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                            Oldenburg identified eight key characteristics that
                            define a Third Place:
                        </p>
                    </div>

                    <div className="grid gap-3">
                        {[
                            {
                                number: "1",
                                title: "On Neutral Ground",
                                desc: "Occupants are not legally or financially tied to the area. There is no host-guest relationship; everyone has equal claim to occupy the space. No one is required to play host, and all feel at home and comfortable.",
                            },
                            {
                                number: "2",
                                title: "The Leveler (Inclusive)",
                                desc: "Third Places put no importance on an individual's status in society. Economic and social statuses are rendered irrelevant. In the classroom, hierarchies exist (Professor vs. Student); in the Sunken Garden, these dissolve.",
                            },
                            {
                                number: "3",
                                title: "Conversation is the Main Activity",
                                desc: "The primary activity in Third Places is conversation, which is lively and engaging. Nothing is more important than good conversation and sociability—not consumption, productivity, or structured activity.",
                            },
                            {
                                number: "4",
                                title: "Accessibility and Accommodation",
                                desc: "Third Places must be easy to access and accommodate people's needs. They must be open during times when people are available (early morning, late evening, weekends). The Sunken Garden is always accessible.",
                            },
                            {
                                number: "5",
                                title: "The Regulars",
                                desc: "The space has a core group of regular occupants who give the place its character and help set the welcoming mood. These regulars attract newcomers and make them feel comfortable, ensuring the space maintains its social vitality.",
                            },
                            {
                                number: "6",
                                title: "A Low Profile",
                                desc: "Third Places are characteristically plain and unpretentious. They are homely and without formal claims. This lack of ostentation puts people at ease—there is no pressure to dress up or perform status.",
                            },
                            {
                                number: "7",
                                title: "The Mood is Playful",
                                desc: "The tone of conversation is never marked by tension or hostility. Instead, it is playful and witty. Clever wordplay, teasing, and humor are common. This levity differentiates it from the serious atmospheres of work and home responsibilities.",
                            },
                            {
                                number: "8",
                                title: "A Home Away from Home",
                                desc: "Occupants experience the space as both physically and psychologically comfortable. It provides a sense of possession and belonging that mirrors the feeling of being home, creating rootedness in the community.",
                            },
                        ].map((char) => (
                            <div
                                key={char.number}
                                className="border border-emerald-500/30 bg-emerald-950/40 p-5 rounded"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">
                                        {char.number}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-emerald-300 font-bold text-sm mb-2">
                                            {char.title}
                                        </h4>
                                        <p className="text-emerald-100 text-xs leading-relaxed">
                                            {char.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border border-emerald-400 bg-emerald-950/60 p-6 space-y-3">
                        <h3 className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                            The Sunken Garden as Third Place
                        </h3>
                        <p className="text-emerald-50 text-sm leading-relaxed">
                            The lack of walls or gates makes the space highly
                            permeable, it invites "loitering" not as a negative
                            act of vagrancy, but as a productive social act of
                            community building. Students gather without agenda,
                            forming spontaneous social bonds that constitute the
                            "social capital" of university life.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                            Conclusion
                        </h3>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                            This validates the importance of unstructured,
                            non-commercial, and non-institutional space in urban
                            planning. We live in an era where public space is
                            increasingly privatized or securitized (malls
                            require purchase, parks have curfews), the Third
                            Place remains a radical spatial anomaly, a space of
                            genuine publicness where the "emotional geography"
                            of the student experience finds its most communal
                            expression.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "population",
            title: "THE PULSE OF THE POPULATION",
            subtitle: "Spatiotemporal Dynamics and Urban Rhythms",
            theme: {
                bg: "bg-black",
                textPrimary: "text-purple-50",
                textSecondary: "text-purple-300",
                accent: "purple-400",
                font: "font-mono",
                titleFont: "font-sans",
                visual: "/5.png",
            },
            content: (
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                            Time as a Geographic Dimension
                        </h3>
                        <p className="text-purple-100 text-base leading-relaxed font-mono">
                            Geography is traditionally concerned with{" "}
                            <span className="italic">where</span> things happen.
                            However, a complete spatial understanding requires
                            analyzing <span className="italic">when</span>{" "}
                            things happen.
                        </p>
                        <p className="text-purple-100 text-sm leading-relaxed font-mono">
                            In the context of UP Diliman, the campus is not a static container for activity. Rather, it
                            is a fluid system where population density ebbs and
                            flows like a tide. The same corridor that
                            is packed at 7:30 AM is a ghost town by 9:00 PM.
                            We employ{" "}
                            <span className="font-bold">Time Geography</span>, a
                            theoretical framework developed by Swedish
                            geographer Torsten Hägerstrand, to analyze the
                            "pulse" of the campus.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                            The Space-Time Prism
                        </h3>
                        <p className="text-purple-100 text-sm font-mono leading-relaxed">
                            Hägerstrand introduced the concept of the{" "}
                            <span className="bold">Space-Time Path</span>—a
                            trajectory representing an individual's movement
                            through both space and time. Every human action
                            occupies both a location (where) and a duration
                            (when).
                        </p>
                        <p className="text-purple-100 text-sm font-mono leading-relaxed mb-4">
                            He argued that human movement is not free but
                            governed by three types of constraints that form a
                            "Space-Time Prism," the cone of possible locations a
                            person can reach within a given timeframe:
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {[
                            {
                                type: "Capability Constraints",
                                icon: "⏰",
                                desc: "Biological and physical limits on human action. Humans must eat, sleep, and rest. Travel speed is limited by available transportation.",
                                examples: [
                                    "A student cannot attend a 6:00 AM class if they require 4 hours of sleep and went to bed at 3:00 AM",
                                    "Walking speed limits how far one can travel in 10 minutes between classes",
                                    "The need to eat lunch constrains midday scheduling",
                                ],
                            },
                            {
                                type: "Coupling Constraints",
                                icon: "🔗",
                                desc: "The requirement to be at a specific place at a specific time with other people. This is the fundamental mechanism of social coordination.",
                                examples: [
                                    "A 7:00 AM class lecture requires student and professor to couple in space-time",
                                    "Group project meetings require all members to synchronize their paths",
                                    "Exam schedules create massive temporal bundles of converging paths",
                                ],
                            },
                            {
                                type: "Authority Constraints",
                                icon: "🔒",
                                desc: "Institutional or legal rules that control access to space and time. These are socially constructed boundaries.",
                                examples: [
                                    "Building curfews and lockdowns that prevent access after certain hours",
                                    "ID requirements restricting entry to specific facilities",
                                    "Class schedules that dictate when spaces are accessible vs. off-limits",
                                ],
                            },
                        ].map((constraint) => (
                            <div
                                key={constraint.type}
                                className="border border-purple-500/30 bg-purple-950/40 p-6 rounded"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <span className="text-3xl">
                                        {constraint.icon}
                                    </span>
                                    <div className="flex-1">
                                        <h4 className="text-purple-300 font-bold text-sm uppercase tracking-wider mb-2">
                                            {constraint.type}
                                        </h4>
                                        <p className="text-purple-100 text-sm font-mono leading-relaxed">
                                            {constraint.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <p className="text-purple-400 text-xs font-mono font-bold">
                                        EXAMPLES:
                                    </p>
                                    {constraint.examples.map((ex, i) => (
                                        <div
                                            key={i}
                                            className="bg-purple-900/30 p-3 rounded"
                                        >
                                            <p className="text-purple-200 text-xs font-mono leading-relaxed">
                                                • {ex}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border border-purple-500/30 bg-purple-950/60 p-5">
                        <p className="text-purple-200 text-sm font-mono leading-relaxed">
                            <span className="font-bold text-purple-300">
                                The Space-Time Prism:
                            </span>{" "}
                            These three constraints together define the limits
                            of where a student can possibly go within a given
                            timeframe. If a student has class at 9:00 AM and
                            must travel 15 minutes to get there, their
                            Space-Time Prism narrows, that is, they cannot be more than 15
                            minutes away at 8:45 AM. The "prism" visualizes this
                            cone of accessibility.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                            The Campus Heartbeat
                        </h3>
                        <p className="text-purple-100 text-sm font-mono leading-relaxed">
                            The campus functions like a biological organ with
                            systolic and diastolic phases—periods of maximum
                            contraction (peak density) and expansion
                            (dispersal).
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-blue-500/30 bg-blue-950/40 p-6 rounded">
                            <h4 className="font-bold text-blue-300 mb-4 font-mono text-xl">
                                07:30 — THE SYSTOLE (PEAK)
                            </h4>
                            <div className="space-y-4">
                                <div className="bg-blue-900/40 p-4 rounded">
                                    <p className="text-blue-400 text-xs font-mono mb-2 font-bold">
                                        POPULATION DENSITY
                                    </p>
                                    <p className="text-blue-100 text-sm font-mono leading-relaxed">
                                        Corridor becomes a massive "bundle" of
                                        converging Space-Time Paths. Students
                                        rush from dormitories, jeepney stops,
                                        and parking lots toward classroom
                                        buildings.
                                    </p>
                                </div>
                                <div className="bg-blue-900/40 p-4 rounded">
                                    <p className="text-blue-400 text-xs font-mono mb-2 font-bold">
                                        MOVEMENT BEHAVIOR
                                    </p>
                                    <p className="text-blue-100 text-sm font-mono leading-relaxed">
                                        Movement is directed, urgent, and
                                        synchronized. Everyone walks with
                                        purpose. There is little lingering or
                                        social interaction, the Coupling
                                        Constraint (7:00 AM class start) creates
                                        temporal pressure.
                                    </p>
                                </div>
                                <div className="bg-blue-900/40 p-4 rounded">
                                    <p className="text-blue-400 text-xs font-mono mb-2 font-bold">
                                        SPATIAL FUNCTION
                                    </p>
                                    <p className="text-blue-100 text-sm font-mono leading-relaxed">
                                        The corridor functions strictly as a
                                        channel for transit, a "Path" in Lynchian
                                        terms. It is not a place to dwell.
                                    </p>
                                </div>
                                <div className="bg-blue-900/40 p-4 rounded">
                                    <p className="text-blue-400 text-xs font-mono mb-2 font-bold">
                                        DOMINANT CONSTRAINT
                                    </p>
                                    <p className="text-blue-100 text-sm font-mono leading-relaxed">
                                        Coupling Constraint (must reach
                                        classroom on time)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-pink-500/30 bg-pink-950/40 p-6 rounded">
                            <h4 className="font-bold text-pink-300 mb-4 font-mono text-xl">
                                21:00 — THE DIASTOLE (LULL)
                            </h4>
                            <div className="space-y-4">
                                <div className="bg-pink-900/40 p-4 rounded">
                                    <p className="text-pink-400 text-xs font-mono mb-2 font-bold">
                                        POPULATION DENSITY
                                    </p>
                                    <p className="text-pink-100 text-sm font-mono leading-relaxed">
                                        The same corridor is nearly empty. Only
                                        scattered individuals or small groups
                                        remain, night students, security guards,
                                        joggers, or visitors using the
                                        space for leisure.
                                    </p>
                                </div>
                                <div className="bg-pink-900/40 p-4 rounded">
                                    <p className="text-pink-400 text-xs font-mono mb-2 font-bold">
                                        MOVEMENT BEHAVIOR
                                    </p>
                                    <p className="text-pink-100 text-sm font-mono leading-relaxed">
                                        Movement is leisurely, exploratory,
                                        social. Groups linger and chat.
                                        The urgency has
                                        evaporated.
                                    </p>
                                </div>
                                <div className="bg-pink-900/40 p-4 rounded">
                                    <p className="text-pink-400 text-xs font-mono mb-2 font-bold">
                                        SPATIAL FUNCTION
                                    </p>
                                    <p className="text-pink-100 text-sm font-mono leading-relaxed">
                                        The corridor transforms into a container
                                        for social and recreational activity. It
                                        becomes a de facto "Third Place."
                                    </p>
                                </div>
                                <div className="bg-pink-900/40 p-4 rounded">
                                    <p className="text-pink-400 text-xs font-mono mb-2 font-bold">
                                        DOMINANT CONSTRAINT
                                    </p>
                                    <p className="text-pink-100 text-sm font-mono leading-relaxed">
                                        Authority Constraint (building access
                                        hours, curfews)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                            5.4 Conclusion: The Fluidity of Geography
                        </h3>
                        <p className="text-purple-100 text-sm leading-relaxed font-mono">
                            This demonstrates that population is a dynamic, rhythmic
                            phenomenon. A "high-traffic area" is only
                            high-traffic for specific temporal windows. The
                            function and character of space change with the
                            temporal pulse of institutional schedules.
                        </p>
                        <p className="text-purple-100 text-sm leading-relaxed font-mono">
                            The student's daily life is a constant negotiation
                            of the Space-Time Prism, attempting to fit necessary
                            biological activities (eating, sleeping), social
                            desires (meeting friends), and institutional
                            obligations (attending class) within the rigid
                            temporal walls erected by the university schedule.
                        </p>
                        <p className="text-purple-100 text-sm leading-relaxed font-mono">
                            Geography, therefore, is
                            about the "when." Place is a product of
                            temporal and functional patterns. The campus pulses
                            with rhythms dictated by institutional, biological,
                            and social forces, revealing that human geography is
                            ultimately a study of coordinated time.
                        </p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="relative">
            {/* Hero section with proper spacing */}
            <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden px-4">
                <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950 to-black" />

                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                        backgroundSize: "200% 200%",
                    }}
                />

                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                        initial={{
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                        }}
                        animate={{
                            x: [
                                Math.random() * 100 - 50,
                                Math.random() * 100 - 50,
                            ],
                            y: [
                                Math.random() * 100 - 50,
                                Math.random() * 100 - 50,
                            ],
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 5 + i * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                        }}
                        suppressHydrationWarning
                    />
                ))}

                <motion.div
                    className="relative z-10 text-center px-4 md:px-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="inline-block mb-4 md:mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            bounce: 0.5,
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 25,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        >
                            <svg
                                className="w-16 h-16 md:w-24 md:h-24 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <title>Loading...</title>
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    strokeWidth="0.5"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.5}
                                    d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tighter px-2"
                        variants={itemVariants}
                    >
                        PLACES & LANDSCAPES
                    </motion.h1>

                    <motion.p
                        className="text-base sm:text-xl md:text-2xl text-blue-300 mb-3 md:mb-4 font-mono px-4"
                        variants={itemVariants}
                    >
                        into the Changing World
                    </motion.p>

                    <motion.p
                        className="text-xs md:text-sm text-blue-400/60 uppercase tracking-widest"
                        variants={itemVariants}
                    >
                        Geography 1: Final Requirement
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="mt-12 md:mt-16"
                    >
                        <motion.p
                            className="text-white/40 text-xs font-mono uppercase tracking-wider"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                        >
                            Scroll to explore
                        </motion.p>
                        <motion.div
                            className="w-px h-12 md:h-16 bg-linear-to-b from-white/40 to-transparent mx-auto mt-4"
                            animate={{
                                scaleY: [1, 1.5, 1],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {sections.map((section, index) => (
                <StickyScrollSection
                    key={section.id}
                    section={section}
                    index={index}
                />
            ))}

            <motion.footer
                className="bg-black text-white py-12 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <motion.p
                    className="text-sm font-mono text-white/60"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Geography 1: Places and Landscapes in a Changing World
                </motion.p>
                <motion.p
                    className="text-xs text-white/40 mt-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    website by Jezzu Morrisen C. Quimosing
                </motion.p>
            </motion.footer>
        </div>
    );
}
