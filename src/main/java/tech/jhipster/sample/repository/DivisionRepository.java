package tech.jhipster.sample.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tech.jhipster.sample.domain.Division;

/**
 * Spring Data MongoDB reactive repository for the Division entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DivisionRepository extends ReactiveMongoRepository<Division, String> {}
