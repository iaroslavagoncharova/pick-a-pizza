import promisePool from '../utils/database.mjs';

const sendPromptData = async () => {
    try {
        const sql = `SELECT prompt_name FROM Prompts`;
        const result = await promisePool.query(sql);
        const [rows] = result;
        console.log('Pizza info', rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export default sendPromptData;