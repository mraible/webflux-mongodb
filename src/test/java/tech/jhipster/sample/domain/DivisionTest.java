package tech.jhipster.sample.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class DivisionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Division.class);
        Division division1 = new Division();
        division1.setId("id1");
        Division division2 = new Division();
        division2.setId(division1.getId());
        assertThat(division1).isEqualTo(division2);
        division2.setId("id2");
        assertThat(division1).isNotEqualTo(division2);
        division1.setId(null);
        assertThat(division1).isNotEqualTo(division2);
    }
}
