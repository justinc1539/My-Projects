from question_model import Question
from data import question_data
from quiz_brain import QuizBrain
from ui import QuizInterface

question_bank = [Question(question["question"], question["correct_answer"]) for question in question_data]
quiz_ui = QuizInterface(QuizBrain(question_bank))
