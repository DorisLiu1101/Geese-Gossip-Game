const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjR-MOK-zb5l7YRcRmKVYQ7fJbM9zUSTYrvdwZ2B8j48A0k_5UO_-U7sA24r4vRqw3b4v8884FeWdH/pub?output=csv';

const FALLBACK_SCENARIOS = [
  '鵝鵝突然在聚會上大聲唱了一首走音的歌',
  '鵝鵝偷偷把別人的食物藏起來',
  '鵝鵝在酒館裡跳起了奇怪的舞蹈',
  '鵝鵝假裝喝醉倒在桌上',
  '鵝鵝突然站起來說要講一個秘密但什麼都沒說',
  '鵝鵝把酒灑在另一隻鵝身上',
  '鵝鵝大聲打了一個嗝然後假裝不是自己',
  '鵝鵝偷偷把椅子往後拉讓別人坐空',
  '鵝鵝突然學另一隻鵝講話的樣子',
  '鵝鵝把桌上的蠟燭吹熄然後說是風',
];

export async function fetchScenarios(): Promise<string[]> {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error('CSV fetch failed');
    }
    const text = await response.text();
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length > 1) {
      return lines.slice(1);
    }
    return FALLBACK_SCENARIOS;
  } catch (error) {
    console.warn('使用後備情境資料:', error);
    return FALLBACK_SCENARIOS;
  }
}
