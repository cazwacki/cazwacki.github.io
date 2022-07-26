import React from 'react';
import Typography from '@mui/material/Typography';
import Labor from '../components/labor.js'


class LaborWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.labor = props.labor
        this.title = props.title
        this.count = props.count
        this.is_job = props.is_job
        this.labor_to_render = []
        for (let i = 0; i < this.count && i < this.labor.length; i++) {
            this.labor_to_render.push(<Labor is_job={this.is_job} labor={this.labor[i]} timeout={150 * (i + 1)} />)
        }
    }

    render() {
        return (
            <div className="p-10 w-3/4 text-center m-auto">
                <div>
                    <Typography variant="h4" color="text.primary" style={{ transition: 'all 0.25s linear' }}>{this.title}</Typography>
                    <br />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {this.labor_to_render}
                </div>
            </div>
        )
    }
}

export default LaborWrapper