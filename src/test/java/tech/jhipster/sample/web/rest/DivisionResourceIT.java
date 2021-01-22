package tech.jhipster.sample.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;

import java.time.Duration;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import tech.jhipster.sample.IntegrationTest;
import tech.jhipster.sample.domain.Division;
import tech.jhipster.sample.domain.enumeration.DivisionType;
import tech.jhipster.sample.repository.DivisionRepository;

/**
 * Integration tests for the {@link DivisionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient
@WithMockUser
class DivisionResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_NUMBER_OF_PEOPLE = 1L;
    private static final Long UPDATED_NUMBER_OF_PEOPLE = 2L;

    private static final DivisionType DEFAULT_DIVISION_TYPE = DivisionType.SCHOOL;
    private static final DivisionType UPDATED_DIVISION_TYPE = DivisionType.CLASS;

    private static final String DEFAULT_COLOR_BACKGROUND = "AAAAAAAAAA";
    private static final String UPDATED_COLOR_BACKGROUND = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_COLOR_TEXT = "BBBBBBBBBB";

    @Autowired
    private DivisionRepository divisionRepository;

    @Autowired
    private WebTestClient webTestClient;

    private Division division;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Division createEntity() {
        Division division = new Division()
            .name(DEFAULT_NAME)
            .shortName(DEFAULT_SHORT_NAME)
            .numberOfPeople(DEFAULT_NUMBER_OF_PEOPLE)
            .divisionType(DEFAULT_DIVISION_TYPE)
            .colorBackground(DEFAULT_COLOR_BACKGROUND)
            .colorText(DEFAULT_COLOR_TEXT);
        return division;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Division createUpdatedEntity() {
        Division division = new Division()
            .name(UPDATED_NAME)
            .shortName(UPDATED_SHORT_NAME)
            .numberOfPeople(UPDATED_NUMBER_OF_PEOPLE)
            .divisionType(UPDATED_DIVISION_TYPE)
            .colorBackground(UPDATED_COLOR_BACKGROUND)
            .colorText(UPDATED_COLOR_TEXT);
        return division;
    }

    @BeforeEach
    public void initTest() {
        divisionRepository.deleteAll().block();
        division = createEntity();
    }

    @Test
    void createDivision() throws Exception {
        int databaseSizeBeforeCreate = divisionRepository.findAll().collectList().block().size();
        // Create the Division
        webTestClient
            .post()
            .uri("/api/divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(division))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Division in the database
        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeCreate + 1);
        Division testDivision = divisionList.get(divisionList.size() - 1);
        assertThat(testDivision.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDivision.getShortName()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testDivision.getNumberOfPeople()).isEqualTo(DEFAULT_NUMBER_OF_PEOPLE);
        assertThat(testDivision.getDivisionType()).isEqualTo(DEFAULT_DIVISION_TYPE);
        assertThat(testDivision.getColorBackground()).isEqualTo(DEFAULT_COLOR_BACKGROUND);
        assertThat(testDivision.getColorText()).isEqualTo(DEFAULT_COLOR_TEXT);
    }

    @Test
    void createDivisionWithExistingId() throws Exception {
        // Create the Division with an existing ID
        division.setId("existing_id");

        int databaseSizeBeforeCreate = divisionRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri("/api/divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(division))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Division in the database
        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = divisionRepository.findAll().collectList().block().size();
        // set the field null
        division.setName(null);

        // Create the Division, which fails.

        webTestClient
            .post()
            .uri("/api/divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(division))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDivisionTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = divisionRepository.findAll().collectList().block().size();
        // set the field null
        division.setDivisionType(null);

        // Create the Division, which fails.

        webTestClient
            .post()
            .uri("/api/divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(division))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllDivisionsAsStream() {
        // Initialize the database
        divisionRepository.save(division).block();

        List<Division> divisionList = webTestClient
            .get()
            .uri("/api/divisions")
            .accept(MediaType.APPLICATION_STREAM_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_STREAM_JSON)
            .returnResult(Division.class)
            .getResponseBody()
            .filter(division::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(divisionList).isNotNull();
        assertThat(divisionList).hasSize(1);
        Division testDivision = divisionList.get(0);
        assertThat(testDivision.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDivision.getShortName()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testDivision.getNumberOfPeople()).isEqualTo(DEFAULT_NUMBER_OF_PEOPLE);
        assertThat(testDivision.getDivisionType()).isEqualTo(DEFAULT_DIVISION_TYPE);
        assertThat(testDivision.getColorBackground()).isEqualTo(DEFAULT_COLOR_BACKGROUND);
        assertThat(testDivision.getColorText()).isEqualTo(DEFAULT_COLOR_TEXT);
    }

    @Test
    void getAllDivisions() {
        // Initialize the database
        divisionRepository.save(division).block();

        // Get all the divisionList
        webTestClient
            .get()
            .uri("/api/divisions?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(division.getId()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].shortName")
            .value(hasItem(DEFAULT_SHORT_NAME))
            .jsonPath("$.[*].numberOfPeople")
            .value(hasItem(DEFAULT_NUMBER_OF_PEOPLE.intValue()))
            .jsonPath("$.[*].divisionType")
            .value(hasItem(DEFAULT_DIVISION_TYPE.toString()))
            .jsonPath("$.[*].colorBackground")
            .value(hasItem(DEFAULT_COLOR_BACKGROUND))
            .jsonPath("$.[*].colorText")
            .value(hasItem(DEFAULT_COLOR_TEXT));
    }

    @Test
    void getDivision() {
        // Initialize the database
        divisionRepository.save(division).block();

        // Get the division
        webTestClient
            .get()
            .uri("/api/divisions/{id}", division.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(division.getId()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.shortName")
            .value(is(DEFAULT_SHORT_NAME))
            .jsonPath("$.numberOfPeople")
            .value(is(DEFAULT_NUMBER_OF_PEOPLE.intValue()))
            .jsonPath("$.divisionType")
            .value(is(DEFAULT_DIVISION_TYPE.toString()))
            .jsonPath("$.colorBackground")
            .value(is(DEFAULT_COLOR_BACKGROUND))
            .jsonPath("$.colorText")
            .value(is(DEFAULT_COLOR_TEXT));
    }

    @Test
    void getNonExistingDivision() {
        // Get the division
        webTestClient
            .get()
            .uri("/api/divisions/{id}", Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void updateDivision() throws Exception {
        // Initialize the database
        divisionRepository.save(division).block();

        int databaseSizeBeforeUpdate = divisionRepository.findAll().collectList().block().size();

        // Update the division
        Division updatedDivision = divisionRepository.findById(division.getId()).block();
        updatedDivision
            .name(UPDATED_NAME)
            .shortName(UPDATED_SHORT_NAME)
            .numberOfPeople(UPDATED_NUMBER_OF_PEOPLE)
            .divisionType(UPDATED_DIVISION_TYPE)
            .colorBackground(UPDATED_COLOR_BACKGROUND)
            .colorText(UPDATED_COLOR_TEXT);

        webTestClient
            .put()
            .uri("/api/divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(updatedDivision))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Division in the database
        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeUpdate);
        Division testDivision = divisionList.get(divisionList.size() - 1);
        assertThat(testDivision.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDivision.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testDivision.getNumberOfPeople()).isEqualTo(UPDATED_NUMBER_OF_PEOPLE);
        assertThat(testDivision.getDivisionType()).isEqualTo(UPDATED_DIVISION_TYPE);
        assertThat(testDivision.getColorBackground()).isEqualTo(UPDATED_COLOR_BACKGROUND);
        assertThat(testDivision.getColorText()).isEqualTo(UPDATED_COLOR_TEXT);
    }

    @Test
    void updateNonExistingDivision() throws Exception {
        int databaseSizeBeforeUpdate = divisionRepository.findAll().collectList().block().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri("/api/divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(division))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Division in the database
        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDivisionWithPatch() throws Exception {
        // Initialize the database
        divisionRepository.save(division).block();

        int databaseSizeBeforeUpdate = divisionRepository.findAll().collectList().block().size();

        // Update the division using partial update
        Division partialUpdatedDivision = new Division();
        partialUpdatedDivision.setId(division.getId());

        partialUpdatedDivision.colorBackground(UPDATED_COLOR_BACKGROUND);

        webTestClient
            .patch()
            .uri("/api/divisions")
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDivision))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Division in the database
        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeUpdate);
        Division testDivision = divisionList.get(divisionList.size() - 1);
        assertThat(testDivision.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDivision.getShortName()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testDivision.getNumberOfPeople()).isEqualTo(DEFAULT_NUMBER_OF_PEOPLE);
        assertThat(testDivision.getDivisionType()).isEqualTo(DEFAULT_DIVISION_TYPE);
        assertThat(testDivision.getColorBackground()).isEqualTo(UPDATED_COLOR_BACKGROUND);
        assertThat(testDivision.getColorText()).isEqualTo(DEFAULT_COLOR_TEXT);
    }

    @Test
    void fullUpdateDivisionWithPatch() throws Exception {
        // Initialize the database
        divisionRepository.save(division).block();

        int databaseSizeBeforeUpdate = divisionRepository.findAll().collectList().block().size();

        // Update the division using partial update
        Division partialUpdatedDivision = new Division();
        partialUpdatedDivision.setId(division.getId());

        partialUpdatedDivision
            .name(UPDATED_NAME)
            .shortName(UPDATED_SHORT_NAME)
            .numberOfPeople(UPDATED_NUMBER_OF_PEOPLE)
            .divisionType(UPDATED_DIVISION_TYPE)
            .colorBackground(UPDATED_COLOR_BACKGROUND)
            .colorText(UPDATED_COLOR_TEXT);

        webTestClient
            .patch()
            .uri("/api/divisions")
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDivision))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Division in the database
        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeUpdate);
        Division testDivision = divisionList.get(divisionList.size() - 1);
        assertThat(testDivision.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDivision.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testDivision.getNumberOfPeople()).isEqualTo(UPDATED_NUMBER_OF_PEOPLE);
        assertThat(testDivision.getDivisionType()).isEqualTo(UPDATED_DIVISION_TYPE);
        assertThat(testDivision.getColorBackground()).isEqualTo(UPDATED_COLOR_BACKGROUND);
        assertThat(testDivision.getColorText()).isEqualTo(UPDATED_COLOR_TEXT);
    }

    @Test
    void partialUpdateDivisionShouldThrown() throws Exception {
        // Update the division without id should throw
        Division partialUpdatedDivision = new Division();

        webTestClient
            .patch()
            .uri("/api/divisions")
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDivision))
            .exchange()
            .expectStatus()
            .isBadRequest();
    }

    @Test
    void deleteDivision() {
        // Initialize the database
        divisionRepository.save(division).block();

        int databaseSizeBeforeDelete = divisionRepository.findAll().collectList().block().size();

        // Delete the division
        webTestClient
            .delete()
            .uri("/api/divisions/{id}", division.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Division> divisionList = divisionRepository.findAll().collectList().block();
        assertThat(divisionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
