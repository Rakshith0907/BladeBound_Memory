/* =========================
   BLADEBOUND MEMORY - DATA
========================= */

const WEAPONS = [
    {
        id: "tanjiro_sword",
        name: "Tanjiro's Sword",
        image: "assests/weapons/tanjiro.png"
    },
    {
        id: "rengoku_sword",
        name: "Rengoku's Flame Sword",
        image: "assests/weapons/rengoku.png"
    },
    {
        id: "naruto_kunai",
        name: "Naruto's Kunai",
        image: "assests/weapons/kunai.png"
    },
    {
        id: "ichigo_zangetsu",
        name: "Ichigo's Zangetsu",
        image: "assests/weapons/zangetsu.png"
    },
    {
        id: "odm_blades",
        name: "ODM Blades",
        image: "assests/weapons/odm.png"
    },
    {
        id: "wado_ichimonji",
        name: "Wado Ichimonji",
        image: "assests/weapons/wado.png"
    },
    {
        id: "enma",
        name: "Enma",
        image: "assests/weapons/enma.png"
    },
    {
        id: "whitebeard_sword",
        name: "Whitebeard's Murakumogiri",
        image: "assests/weapons/murakumogiri.png"
    },
    {
        id: "inosuke_swords",
        name: "Inosuke's Swords",
        image: "assests/weapons/inosuke.png"
    },
    {
        id: "zenitsu_sword",
        name: "Zenitsu's Sword",
        image: "assests/weapons/zenitsu.png"
    }
];

/* =========================
   CARD SET CREATOR
========================= */

/**
 * Duplicates & shuffles weapon cards
 * @param {Array} weaponList
 * @returns {Array}
 */
function createCardSet(weaponList) {
    const duplicated = [...weaponList, ...weaponList];

    return duplicated
        .map(card => ({ ...card, uuid: crypto.randomUUID() }))
        .sort(() => Math.random() - 0.5);
}
