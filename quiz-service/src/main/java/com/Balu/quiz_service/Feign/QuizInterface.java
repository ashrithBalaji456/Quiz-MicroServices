package com.Balu.quiz_service.Feign;

import com.Balu.quiz_service.Model.QuestionWrapper;
import com.Balu.quiz_service.Model.Responce;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@FeignClient(name = "QUESTIONSERVICE", path = "/question")
public interface QuizInterface {
    @GetMapping("generate")
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String category, @RequestParam int numQue);
    @PostMapping("getById")
    public ResponseEntity<List<QuestionWrapper>> getQuistionById(@RequestBody List<Integer> questionIds);


    @PostMapping("getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Responce> responses);
}
