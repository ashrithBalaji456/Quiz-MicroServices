package com.Balu.questionService.Repository;

import com.Balu.questionService.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question,Integer> {
    List<Question> findByCategory(String category);
    @Query(value = "select q.id from Question q where q.category=:category order By Random() limit :numQue")
    List<Integer> findRandomQuestions(String category, int numQue);
}
