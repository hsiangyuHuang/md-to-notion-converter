const express = require('express');
const { markdownToBlocks } = require('@tryfabric/martian');

const app = express();
const port = process.env.PORT || 3000; // Railway 会设置 PORT 环境变量

app.use(express.json()); // 用于解析 JSON 请求体
app.use(express.text()); // 用于直接解析文本格式的 Markdown 请求体

// 健康检查端点 (可选，但推荐)
app.get('/', (req, res) => {
  res.send('Markdown to Notion service is running!');
});

// Markdown 转换端点
app.post('/convert', (req, res) => {
  try {
    const markdownContent = req.body; // 假设 Markdown 内容在请求体中
    if (typeof markdownContent !== 'string' || markdownContent.trim() === '') {
      return res.status(400).json({ error: 'Markdown content is required in the request body as plain text.' });
    }

    const notionBlocks = markdownToBlocks(markdownContent);
    res.json(notionBlocks);
  } catch (error) {
    console.error('Error converting markdown:', error);
    res.status(500).json({ error: 'Failed to convert markdown to Notion blocks.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});