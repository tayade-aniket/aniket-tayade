-- Insert sample projects
INSERT INTO projects (title, description, image, technologies, category, github_url, live_url, blog_url, highlights, featured) VALUES
(
  'Customer Churn Prediction Model',
  'Built a machine learning model to predict customer churn using ensemble methods and feature engineering, achieving 94% accuracy.',
  '/placeholder.svg?height=300&width=400',
  ARRAY['Python', 'scikit-learn', 'pandas', 'XGBoost', 'Matplotlib'],
  'Machine Learning',
  'https://github.com/anikettayade/customer-churn-prediction',
  'https://customer-churn-demo.vercel.app',
  '/blog/customer-churn-prediction',
  ARRAY['94% accuracy on test set', 'Reduced false positives by 23%', 'Deployed with Flask API'],
  true
),
(
  'Sales Forecasting Dashboard',
  'Created an interactive Tableau dashboard for sales forecasting using time series analysis and seasonal decomposition.',
  '/placeholder.svg?height=300&width=400',
  ARRAY['Tableau', 'Python', 'SQL', 'PostgreSQL', 'Time Series'],
  'Data Visualization',
  'https://github.com/anikettayade/sales-forecasting',
  'https://public.tableau.com/views/SalesForecasting/Dashboard',
  NULL,
  ARRAY['Real-time data updates', 'MAPE < 8% accuracy', 'Executive-level insights'],
  true
),
(
  'Sentiment Analysis API',
  'Developed a REST API for sentiment analysis of social media posts using BERT and deployed on AWS.',
  '/placeholder.svg?height=300&width=400',
  ARRAY['Python', 'BERT', 'FastAPI', 'AWS', 'Docker'],
  'NLP',
  'https://github.com/anikettayade/sentiment-api',
  'https://sentiment-api.anikettayade.com',
  '/blog/building-sentiment-analysis-api',
  ARRAY['89% accuracy on test data', 'Handles 1000+ requests/min', 'Multi-language support'],
  false
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, image, tags, published, slug) VALUES
(
  'Building Your First Machine Learning Pipeline',
  'A comprehensive guide to creating end-to-end ML pipelines with Python. In this article, we''ll explore the essential components of a machine learning pipeline, from data preprocessing to model deployment. We''ll cover data validation, feature engineering, model training, evaluation, and deployment strategies. By the end of this guide, you''ll have a solid understanding of how to build robust, scalable ML pipelines that can handle real-world data challenges.',
  'Learn how to build robust machine learning pipelines from data preprocessing to model deployment, with practical examples and best practices.',
  '/placeholder.svg?height=200&width=300',
  ARRAY['Machine Learning', 'Python', 'MLOps', 'Tutorial'],
  true,
  'building-your-first-ml-pipeline'
),
(
  'Data Visualization Best Practices for Business Intelligence',
  'Effective data visualization techniques for creating compelling business dashboards. This comprehensive guide covers the principles of effective data visualization, color theory, chart selection, and dashboard design. We''ll explore how to choose the right visualization for your data, create compelling narratives, and design dashboards that drive business decisions. Learn about common pitfalls and how to avoid them while creating visualizations that truly communicate insights.',
  'Discover the principles of effective data visualization and learn how to create dashboards that tell compelling stories with your data.',
  '/placeholder.svg?height=200&width=300',
  ARRAY['Data Visualization', 'Tableau', 'Business Intelligence', 'Design'],
  true,
  'data-visualization-best-practices'
),
(
  'Understanding BERT for Sentiment Analysis',
  'Deep dive into BERT architecture and its application in sentiment analysis. This technical article explores the transformer architecture, attention mechanisms, and how BERT revolutionized natural language processing. We''ll implement a sentiment analysis model from scratch, fine-tune BERT for our specific use case, and deploy it as a production-ready API. Learn about preprocessing techniques, model optimization, and performance evaluation metrics.',
  'Explore how BERT revolutionized NLP and learn to implement sentiment analysis with state-of-the-art transformer models.',
  '/placeholder.svg?height=200&width=300',
  ARRAY['NLP', 'BERT', 'Deep Learning', 'Sentiment Analysis'],
  true,
  'understanding-bert-sentiment-analysis'
);

-- Insert sample skills
INSERT INTO skills (name, level, category) VALUES
('Python', 95, 'Programming'),
('R', 85, 'Programming'),
('SQL', 90, 'Programming'),
('JavaScript', 75, 'Programming'),
('Machine Learning', 90, 'ML/AI'),
('Deep Learning', 85, 'ML/AI'),
('NLP', 80, 'ML/AI'),
('Computer Vision', 75, 'ML/AI'),
('Tableau', 95, 'Visualization'),
('Power BI', 85, 'Visualization'),
('Plotly', 90, 'Visualization'),
('D3.js', 70, 'Visualization'),
('AWS', 80, 'Cloud'),
('Docker', 75, 'Cloud'),
('Git', 90, 'Cloud'),
('Apache Spark', 70, 'Cloud');
