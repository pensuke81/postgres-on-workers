import { pgTable, integer, text, numeric, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const periodicTable = pgTable("periodic_table", {
	atomicNumber: integer("AtomicNumber").primaryKey().notNull(),
	element: text("Element"),
	symbol: text("Symbol"),
	atomicMass: numeric("AtomicMass"),
	numberOfNeutrons: integer("NumberOfNeutrons"),
	numberOfProtons: integer("NumberOfProtons"),
	numberOfElectrons: integer("NumberOfElectrons"),
	period: integer("Period"),
	group: integer("Group"),
	phase: text("Phase"),
	radioactive: boolean("Radioactive"),
	natural: boolean("Natural"),
	metal: boolean("Metal"),
	nonmetal: boolean("Nonmetal"),
	metalloid: boolean("Metalloid"),
	type: text("Type"),
	atomicRadius: numeric("AtomicRadius"),
	electronegativity: numeric("Electronegativity"),
	firstIonization: numeric("FirstIonization"),
	density: numeric("Density"),
	meltingPoint: numeric("MeltingPoint"),
	boilingPoint: numeric("BoilingPoint"),
	numberOfIsotopes: integer("NumberOfIsotopes"),
	discoverer: text("Discoverer"),
	year: integer("Year"),
	specificHeat: numeric("SpecificHeat"),
	numberOfShells: integer("NumberOfShells"),
	numberOfValence: integer("NumberOfValence"),
});