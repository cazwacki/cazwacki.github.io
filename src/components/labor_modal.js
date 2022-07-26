import React from 'react';
import Day from 'dayjs'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from "@mui/icons-material/Link"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MultiList from './multi_list.js'
import { Link as RouterLink } from 'react-router-dom';

export default function LaborModal({ handleClose, show, is_job, labor, formatted_date_range, formatted_duration, formatted_info }) {
    const style = {
        position: 'absolute',
        margin: '0',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    let button = null
    if (!is_job && labor.title_link !== "") {
        button = (
            <Button target="_blank" sx={{ m: 0 }} href={labor.title_link} startIcon={<Link />} color='info'>Visit Project</Button>
        )
    }

    let optional_link = null
    if (labor.title === "All-in-One Discord Bot") {
        optional_link = (
            <Button component={RouterLink}
                to={'../bot-commands'} target="" color='info' startIcon={<Link />}>Bot Commands</Button>
        )
    } else if (labor.title === "Lost Skies") {
        optional_link = (
            <Button href={'../lost_skies/InspireJam.html'} target="" color='info' startIcon={<Link />}>Play Now</Button>
        )
    }

    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="inline-block align-middle pr-5">
                    <img src={labor.card_image} alt={is_job ? labor.company : labor.title} style={{ height: (is_job ? '5em' : '10em') }} />
                </div>
                <div className="inline-block align-middle">
                    <Typography id="modal-modal-title" color="text.secondary" variant="h6" display="inline">
                        {labor.title} </Typography>
                    <Typography color="text.disabled" variant="subtitle1" display="inline">
                        {is_job ? labor.department : labor.project_type}
                    </Typography>
                    <Typography variant="subtitle2" color="text.subtitle">
                        {is_job ? labor.company + ' \u2022 ' + labor.employment_type : 'Created ' + Day(labor.start_date, "MM/DD/YYYY").format("MMMM YYYY")}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" color="text.subtitle">
                        {is_job ? formatted_date_range + ' \u2022 ' + formatted_duration : 'Last Updated ' + Day(labor.last_updated, "MM/DD/YYYY").format("MMMM YYYY")}
                    </Typography>
                    <div className="align-middle text-left">
                        {button}
                        {optional_link}
                    </div>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.primary">{formatted_info}</Typography>
                <MultiList header={"Tools Used"} lists={labor.tools_used} />
                <MultiList header={"Languages Used"} lists={labor.languages_used} />
            </Box>
        </Modal>
    );
};