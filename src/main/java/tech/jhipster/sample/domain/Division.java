package tech.jhipster.sample.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import tech.jhipster.sample.domain.enumeration.DivisionType;

/**
 * A Division.
 */
@Document(collection = "division")
public class Division implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("name")
    private String name;

    @Field("short_name")
    private String shortName;

    @Field("number_of_people")
    private Long numberOfPeople;

    @NotNull(message = "must not be null")
    @Field("division_type")
    private DivisionType divisionType;

    @Field("color_background")
    private String colorBackground;

    @Field("color_text")
    private String colorText;

    @DBRef
    @Field("divisionsPlace")
    @JsonIgnoreProperties(value = { "preferredDivisions", "owner" }, allowSetters = true)
    private Set<Place> divisionsPlaces = new HashSet<>();

    @DBRef
    @Field("preferredPlaces")
    @JsonIgnoreProperties(value = { "preferredDivisions", "owner" }, allowSetters = true)
    private Set<Place> preferredPlaces = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Division id(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Division name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return this.shortName;
    }

    public Division shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Long getNumberOfPeople() {
        return this.numberOfPeople;
    }

    public Division numberOfPeople(Long numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
        return this;
    }

    public void setNumberOfPeople(Long numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public DivisionType getDivisionType() {
        return this.divisionType;
    }

    public Division divisionType(DivisionType divisionType) {
        this.divisionType = divisionType;
        return this;
    }

    public void setDivisionType(DivisionType divisionType) {
        this.divisionType = divisionType;
    }

    public String getColorBackground() {
        return this.colorBackground;
    }

    public Division colorBackground(String colorBackground) {
        this.colorBackground = colorBackground;
        return this;
    }

    public void setColorBackground(String colorBackground) {
        this.colorBackground = colorBackground;
    }

    public String getColorText() {
        return this.colorText;
    }

    public Division colorText(String colorText) {
        this.colorText = colorText;
        return this;
    }

    public void setColorText(String colorText) {
        this.colorText = colorText;
    }

    public Set<Place> getDivisionsPlaces() {
        return this.divisionsPlaces;
    }

    public Division divisionsPlaces(Set<Place> places) {
        this.setDivisionsPlaces(places);
        return this;
    }

    public Division addDivisionsPlace(Place place) {
        this.divisionsPlaces.add(place);
        place.setOwner(this);
        return this;
    }

    public Division removeDivisionsPlace(Place place) {
        this.divisionsPlaces.remove(place);
        place.setOwner(null);
        return this;
    }

    public void setDivisionsPlaces(Set<Place> places) {
        if (this.divisionsPlaces != null) {
            this.divisionsPlaces.forEach(i -> i.setOwner(null));
        }
        if (places != null) {
            places.forEach(i -> i.setOwner(this));
        }
        this.divisionsPlaces = places;
    }

    public Set<Place> getPreferredPlaces() {
        return this.preferredPlaces;
    }

    public Division preferredPlaces(Set<Place> places) {
        this.setPreferredPlaces(places);
        return this;
    }

    public Division addPreferredPlace(Place place) {
        this.preferredPlaces.add(place);
        place.getPreferredDivisions().add(this);
        return this;
    }

    public Division removePreferredPlace(Place place) {
        this.preferredPlaces.remove(place);
        place.getPreferredDivisions().remove(this);
        return this;
    }

    public void setPreferredPlaces(Set<Place> places) {
        if (this.preferredPlaces != null) {
            this.preferredPlaces.forEach(i -> i.removePreferredDivision(this));
        }
        if (places != null) {
            places.forEach(i -> i.addPreferredDivision(this));
        }
        this.preferredPlaces = places;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Division)) {
            return false;
        }
        return id != null && id.equals(((Division) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Division{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", shortName='" + getShortName() + "'" +
            ", numberOfPeople=" + getNumberOfPeople() +
            ", divisionType='" + getDivisionType() + "'" +
            ", colorBackground='" + getColorBackground() + "'" +
            ", colorText='" + getColorText() + "'" +
            "}";
    }
}
