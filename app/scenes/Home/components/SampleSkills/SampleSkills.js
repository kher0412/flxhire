import React from 'react'
import Link from 'components/Link'
import { LoadingPage } from 'components'
import SampleSkillsIcon from './SampleSkillsIcon'
import styles from './SampleSkills.module.css'

class SampleSkills extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <SampleSkillsIcon />
        </div>

        <div className={styles.heading}>
          Sample Experts
        </div>

        <div className={styles.subheading}>
          Check out a small sample of our pre-screened expert members by skill type.
        </div>

        {this.renderContent()}
      </div>
    )
  }

  renderContent() {
    const { skills } = this.props

    if (!skills) {
      return (
        <LoadingPage />
      )
    }

    const skillCategories = this.renderSkillCategories()

    if (skillCategories.length === 0) {
      return null
    }

    return (
      skillCategories
    )
  }

  renderSkillCategories() {
    const { skills = [] } = this.props
    const categories = new Map()
    const categoryIdToCategoryData = new Map()

    skills.filter(s => s && Array.isArray(s.featured_freelancer_types)).forEach((skill) => {
      skill.featured_freelancer_types.forEach((freelancerType) => {
        if (!categories.has(freelancerType.id)) {
          categories.set(freelancerType.id, [skill])
          categoryIdToCategoryData.set(freelancerType.id, freelancerType)
        } else {
          categories.get(freelancerType.id).push(skill)
        }
      })
    })

    let skillCategoryElements = []

    categories.forEach((_skills, categoryId) => {
      const category = categoryIdToCategoryData.get(categoryId)

      skillCategoryElements.push(
        <div key={category.id} className={styles.category}>
          {_skills.sort((a, b) => a.name.localeCompare(b.name)).map(skill => (
            <Link
              key={skill.id}
              className={styles.itemLink}
              href="/sample/[freelancer_type_id]/[slug]"
              as={`/sample/${category.name.toLowerCase()}/${skill.slug}`}
            >
              <div key={skill.id} className={styles.item}>
                {skill.name} {category.name} Experts
              </div>
            </Link>
          ))}
        </div>,
      )
    })

    return skillCategoryElements
  }
}

export default SampleSkills
