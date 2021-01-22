package tech.jhipster.sample.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class PlaceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Place.class);
        Place place1 = new Place();
        place1.setId("id1");
        Place place2 = new Place();
        place2.setId(place1.getId());
        assertThat(place1).isEqualTo(place2);
        place2.setId("id2");
        assertThat(place1).isNotEqualTo(place2);
        place1.setId(null);
        assertThat(place1).isNotEqualTo(place2);
    }
}
