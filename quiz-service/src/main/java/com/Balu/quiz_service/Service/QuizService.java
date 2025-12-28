package com.Balu.quiz_service.Service;

import com.Balu.quiz_service.Feign.QuizInterface;
import com.Balu.quiz_service.Model.QuestionWrapper;
import com.Balu.quiz_service.Model.Quiz;
import com.Balu.quiz_service.Model.QuizDto;
import com.Balu.quiz_service.Model.Responce;
import com.Balu.quiz_service.Repository.QuizRepo;

import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class QuizService {
    @Autowired
    QuizRepo quizRepo;
    @Autowired
    QuizInterface quizInterface;
    public ResponseEntity<String> createQuiz(String categoryName, Integer numOfQuestion, String title) {
        Quiz quiz=new Quiz();
        List<Integer> questions=quizInterface.getQuestionsForQuiz(categoryName,numOfQuestion).getBody();
        quiz.setTitle(title);
        quiz.setQuestionIds(questions);
        quizRepo.save(quiz);
        return new ResponseEntity<>("Success", HttpStatus.CREATED);

    }

    public ResponseEntity<List<QuestionWrapper>> getQuestions(Integer id) {
        Quiz quiz=quizRepo.findById(id).get();
        List<Integer>questionIds=quiz.getQuestionIds();
        ResponseEntity<List<QuestionWrapper>> questions=quizInterface.getQuistionById(questionIds);
        return  questions;
    }

    public ResponseEntity<Integer> getScore(Integer id, List<Responce> response) {
        ResponseEntity<Integer> Score=quizInterface.getScore(response);
        return Score;
    }
}
