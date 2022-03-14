/* eslint-disable indent */

import { positions, educations } from '../fixtures/timeline_entries'
import { freelancer4, freelancer4Profile } from '../fixtures/freelancer'

export const SKILLS = ['PHP']

export function fillOutProfile() {
  return cy.get('[data-cy=profile-name-edit]').click()
    .get('[data-cy=profile-name-field]').type(`${freelancer4.first_name} ${freelancer4.last_name}`)
    .get('[data-cy=address-full_address] input').type(freelancer4Profile.full_address)
    .wait(1000) // wait for suggestions to load
    .get('[data-cy=address-suggestion-0]')
      .should('contain', freelancer4Profile.country)
      .click()
    .get('[data-cy=address-suggestion-0]').should('not.exist')
    .wait(3000)
    // Select freelancer type
    .get('[data-cy=profile-freelancer-type-edit]').click()
    .get('[data-cy=freelancer-type-technology]').click()
    .wait(Cypress.env('RUN_RESOLUTION') === 'MOBILE' ? 1000 : 0) // Wait for animation on mobile
    // Select years of experience
    .get('[data-cy=profile-total-experience]').click()
    .get(`[data-cy=total-experience-${freelancer4Profile.total_experience}]`).click()
    // Be a Part Time Freelancer
    .get('[data-cy=profile-rate-edit]').click()
    .get('[data-cy=profile-job-type]').click()
    .get('[data-cy=profile-job-type-freelance]').click()
    // Set hourly rate minimum
    .get('[data-cy=textfield-freelancer_rate] input').type(freelancer4Profile.freelancer_rate_cents / 100)
    .get('[data-cy=profile-rate-close]').click()
    .wait(Cypress.env('RUN_RESOLUTION') === 'MOBILE' ? 1000 : 0) // Wait for animation on mobile
    // Select size of team
    .get('[data-cy=profile-management]').click()
    .get(`[data-cy=managed_team_size-option-${freelancer4Profile.managed_team_size}]`).click()
    // Check freelancer subtypes
    .get('[data-cy=profile-specializations-edit]').click()
    .get('[data-cy=profile-specialization-frontend] input').check()
    .get('[data-cy=profile-specialization-backend] input').check()
    .get('[data-cy=profile-specializations-close]').click()
    // Write an intro
    .get('[data-cy=profile-introduction-edit]').click()
    .get('[data-cy=textarea-introduction]').type(freelancer4Profile.text_introduction)
    // Check can work in the US
    .get('[data-cy=profile-us-work]').click()
    .get('[data-cy=profile-us-work-yes]').click()
    // Check part time
    .get('[data-cy=profile-availability-edit]').click()
    .get('[data-cy=profile-availability-type]').click()
    .get('[data-cy=availability-type-part_time]').click()
    .get('[data-cy=profile-availability-close]').click()

    .get('[data-cy=profile-skills-edit]').click()
    .get('[data-cy=chipfield-input-user_skills]').type(`${SKILLS[0]} `)
    .get(`[data-cy=experience-slider-${SKILLS[0]}-error]`).should('exist')
    // triggering a change or event or altering the value on the hidden input element does not work
    // so even though it's wacky, we simulate a click on the far right end of the slider
    .get(`[data-cy=experience-slider-${SKILLS[0]}] > span > span:first-child`).click('topRight')
    .get(`[data-cy=experience-slider-${SKILLS[0]}-error]`, { timeout: 12000 }).should('not.exist')
    .get('[data-cy=profile-skills-close]').click()

    .wait(5000) // fix issues with opening dialog

    // Fill in education
    /* @TODO test edit and delete buttons
    .get('body').then((body) => {
      const elements = body.find('[data-cy^=delete-education-]')
      if (elements.length > 0) return cy.wrap(elements).each(b => b.click())
    })
    */
    .get('[data-cy=add-education]').click()
    .wait(2000) // fix DOM element detached CI
    .get('[data-cy=textfield-input-title]').click().type(educations[0].title)
    .get('[data-cy=textfield-input-date_start]').click().type(educations[0].date_start.substring(0, 4))
    .get('[data-cy=textfield-input-date_end]').click().type(educations[0].date_end.substring(0, 4))
    .get('[data-cy=textarea-description]').click().type(educations[0].description)
    .get('[data-cy=autocomplete-place] input').click().type(educations[0].place)
    .get('[data-cy=save]').click()
    .wait(5000) // fix issues with opening dialog

    // Fill in work experience
    /* @TODO test edit and delete buttons
    .get('body').then((body) => {
      const elements = body.find('[data-cy^=delete-work-]')
      if (elements.length > 0) return cy.wrap(elements).each(b => b.click())
    })
    */
    .get('[data-cy=add-work]').click()
    .wait(2000) // fix DOM element detached CI
    .get('[data-cy=textfield-input-title]').click().type(positions[0].title)
    .get('[data-cy=textfield-input-place]').click().type(positions[0].place)
    .get('[data-cy=textfield-input-date_start]').click().type(positions[0].date_start.substring(0, 4))
    .get('[data-cy=textfield-input-date_end]').click().type(positions[0].date_end.substring(0, 4))
    .get('[data-cy=textarea-description]').click().type(positions[0].description)
    .get('[data-cy=save]').click()
    .wait(2000) // We need to wait for the dialog closing animation to finish.
}

export function uploadAvatar() {
  const AVATAR_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tBGjZ-5PNfQZQMMj6iroRrARypGcLNCiDxntGiHMX1w3kAYG&s'
  return cy
    .get('[data-cy=edit-avatar]').click()
    .get('[title="Link (URL)"] > .fsp-source-list__icon').click()
    .get('.fsp-url-source__input').type(AVATAR_URL)
    .get('.fsp-url-source__form > .fsp-button').click()
    .wait(5000)
    .get('div > .fsp-button', { timeout: 120000 }).click()
    .wait(5000)
    .get('div > .fsp-button', { timeout: 120000 }).click()
    .get('.fsp-picker', { timeout: 180000 }).should('not.exist')
}
