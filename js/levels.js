/* =========================
   BLADEBOUND MEMORY - LEVELS
========================= */

/*
 Each level defines:
 - name        → Display name
 - pairs       → Number of weapon pairs
 - columns     → Grid column count
*/

const LEVELS = {
    1: {
        name: "Level 1",
        pairs: 4,        // 8 cards
        columns: 4
    },
    2: {
        name: "Level 2",
        pairs: 6,        // 12 cards
        columns: 4
    },
    3: {
        name: "Level 3",
        pairs: 8,        // 16 cards
        columns: 4
    }
};

/* =========================
   HELPERS
========================= */

/**
 * Get current level from URL
 * Example: game.html?level=2
 */
function getCurrentLevel() {
    const params = new URLSearchParams(window.location.search);
    const level = parseInt(params.get("level")) || 1;

    return LEVELS[level] ? level : 1;
}

/**
 * Returns level configuration
 * @param {number} level
 */
function getLevelConfig(level) {
    return LEVELS[level];
}
