const upgradeNames = [
    "Bare Fists",
    "Wooden Stick",
    "Sharp Rock",
    "Bone Club",
    "Stone Axe",
    "Bronze Dagger",
    "Iron Sword",
    "Longbow",
    "Crossbow",
    "Flintlock Pistol",
    "Musket",
    "Revolver",
    "Gatling Gun",
    "Dynamite",
    "Hand Grenade",
    "Machine Gun",
    "Flamethrower",
    "Bazooka",
    "Land Mine",
    "Tank",
    "Fighter Plane",
    "Bomber Aircraft",
    "Guided Missile",
    "Nuclear Warhead",
    "Hydrogen Bomb",
    "Orbital Satellite",
    "Laser Cannon",
    "Plasma Rifle",
    "Railgun",
    "Particle Beam",
    "Antimatter Bomb",
    "Gravity Manipulator",
    "Time Distortion Field",
    "Nanite Swarm",
    "Quantum Disruptor",
    "Dark Matter Projector",
    "Singularity Generator",
    "Supernova Inducer",
    "Reality Warper",
    "Galaxy Destroyer"
];

const fibonacciSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

function getUpgradeCost(level) {
    return Math.round(fibonacciSequence[level + 4] * 7.5);
}

function getUpgradeName(level) {
    return level < upgradeNames.length ? upgradeNames[level] : `Level ${level + 1} Upgrade`;
}

function getUpgradePointsIncrease(level) {
    return Math.ceil((level + 1) * 1.5);
}
