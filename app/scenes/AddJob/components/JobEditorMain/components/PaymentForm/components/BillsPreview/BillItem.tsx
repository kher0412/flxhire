import { Grid, Typography } from '@material-ui/core'
import { Tag, Tags } from 'components'

const BillItem = ({ bill }) => (
  <Grid item xs={12}>
    <Typography variant="body1">
      <Tags>
        <Tag>
          {bill.name}
        </Tag>

        {bill.amount && (
        <Tag>
          {bill.amount}
        </Tag>
        )}
      </Tags>
    </Typography>
  </Grid>
)

export default BillItem