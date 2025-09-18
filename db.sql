-- Database schema for CBT App

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL
);

-- Sample questions
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_option) VALUES
('What is 2 + 2?', '3', '4', '5', '6', 'B'),
('Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Venus', 'B'),
('Who developed the theory of relativity?', 'Newton', 'Einstein', 'Galileo', 'Tesla', 'B'),
('What is the capital of Nigeria?', 'Abuja', 'Lagos', 'Kano', 'Port Harcourt', 'A'),
('Which gas do humans breathe in to survive?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen', 'A');
