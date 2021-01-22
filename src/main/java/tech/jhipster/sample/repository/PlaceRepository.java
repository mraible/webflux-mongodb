package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.sample.domain.Place;

/**
 * Spring Data MongoDB reactive repository for the Place entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaceRepository extends ReactiveMongoRepository<Place, String> {
    @Query("{}")
    Flux<Place> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Place> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Place> findOneWithEagerRelationships(String id);
}
