export type State = {
    player: Position,
    enemies: EnemyPosition[],
    parentRect: DOMRect | null,
    enemyAddTimer: number
};

export const initialState: State = {
    player: { left: 0, top: 0 },
    enemies: [],
    parentRect: null,
    enemyAddTimer: 0
};

type Position = {
    left: number,
    top: number,
};

type EnemyPosition = {
    left: number,
    top: number,
    dx: number, // 進行方向X（%/tick）
    dy: number  // 進行方向Y（%/tick）
};

export const judgeState = (state: State): boolean => {
    // プレイヤーと敵の中心座標の距離が3%未満ならtrue
    return state.enemies.some(enemy => {
        const dx = enemy.left - state.player.left;
        const dy = enemy.top - state.player.top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 6;
    });
};

export const updateGameState = (state: State, callback: (cstate: State) => void): State => {
    let left = 0, top = 0;
    if (
        state.parentRect &&
        state.parentRect.width > 0 &&
        state.parentRect.height > 0 &&
        window.mousePosition &&
        typeof window.mousePosition.x === "number" &&
        typeof window.mousePosition.y === "number"
    ) {
        left = ((window.mousePosition.x - state.parentRect.left) / state.parentRect.width) * 100;
        top = ((window.mousePosition.y - state.parentRect.top) / state.parentRect.height) * 100;
    }
    if (!isFinite(left) || isNaN(left)) left = 0;
    if (!isFinite(top) || isNaN(top)) top = 0;

    const enemyAddTimer = state.enemyAddTimer + 1;
    let addEnemy = false;

    // 30秒ごとに追加間隔を短くする
    let interval = 50;
    const step = 10 * 60; // 10秒(60fps)ごと
    const minInterval = 3; // 最小間隔

    // 10秒ごとにintervalを減らす（例: 50, 40, 30, 20, 10, 5, 3...）
    const decrease = Math.floor(enemyAddTimer / step) * 10;
    interval = Math.max(50 - decrease, minInterval);

    if (enemyAddTimer % interval === 0) {
        addEnemy = true;
    }

    const s: State = {
        player: { left, top },
        enemies: updateEnemies(state.enemies, state.parentRect, addEnemy),
        parentRect: state.parentRect,
        enemyAddTimer
    };

    callback(state);

    return s;
};

function randomEnemy(): EnemyPosition {
    const edge = Math.floor(Math.random() * 4);
    let left = 0, top = 0, dx = 0, dy = 0;
    const step = 0.1; // 速度を小さく
    let vx = 0, vy = 0;

    if (edge === 0) { // 上
        left = Math.random() * 100;
        top = 0;
        vx = Math.random() - 0.5;
        vy = 1;
    } else if (edge === 1) { // 右
        left = 100;
        top = Math.random() * 100;
        vx = -1;
        vy = Math.random() - 0.5;
    } else if (edge === 2) { // 下
        left = Math.random() * 100;
        top = 100;
        vx = Math.random() - 0.5;
        vy = -1;
    } else { // 左
        left = 0;
        top = Math.random() * 100;
        vx = 1;
        vy = Math.random() - 0.5;
    }

    // ベクトルを正規化してstepを掛ける
    const len = Math.sqrt(vx * vx + vy * vy);
    dx = (vx / len) * step;
    dy = (vy / len) * step;

    // dx, dyが小さすぎる場合は補正
    if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
        if (edge === 0 || edge === 2) {
            dy = edge === 0 ? step : -step;
        } else {
            dx = edge === 1 ? -step : step;
        }
    }

    // 念のため有限値チェック
    if (!isFinite(dx) || isNaN(dx)) dx = 0.1;
    if (!isFinite(dy) || isNaN(dy)) dy = 0;

    return { left, top, dx, dy };
}

const updateEnemies = (enemies: EnemyPosition[], rect: DOMRect | null, addEnemy: boolean): EnemyPosition[] => {
    
    let updated = enemies
        .map(enemy => {
            // dx, dyが不正なら0に
            const dx = isFinite(enemy.dx) && !isNaN(enemy.dx) ? enemy.dx : 0;
            const dy = isFinite(enemy.dy) && !isNaN(enemy.dy) ? enemy.dy : 0;
            const left = enemy.left + dx;
            const top = enemy.top + dy;
            if (left < 0 || left > 100 || top < 0 || top > 100) {
                return null;
            }
            return { left, top, dx, dy };
        })
        .filter((enemy): enemy is EnemyPosition => enemy !== null);

    // 上限100体、addEnemyがtrueなら1体だけ追加
    if (addEnemy && rect) { 
        updated.push(randomEnemy());
    }

    return updated;
};