import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
// import pt from 'date-fns/locale/pt';
import en from 'date-fns/locale/en-US';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import DatePicker from '~/components/DatePicker/DatePicker';
import FileInput from './FileInput';
import { Container } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Meetup(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [meetup, setMeetup] = useState({});
  async function handleSubmit(data) {
    try {
      if (id) {
        await api.put(`meetups/${id}`, data);
        toast.success('Meetup updated with success!');
      } else {
        await api.post('meetups', data);
        toast.success('Meetup created with success!');
      }

      history.push('/dashboard');
    } catch (error) {
      toast.error(
        `Error! ${error.response.data.error.message ||
          error.response.data.error}`
      );
    }
  }

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`details-meetup/${id}`);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const compareDate = utcToZonedTime(response.data.date, timezone);
      const data = {
        ...response.data,
        formattedDate: format(compareDate, 'yyyy-MM-dd hh:mm', {
          locale: en,
        }),
      };
      setMeetup(data);
    }

    loadMeetup();
  }, [id]);

  return (
    <Container>
      <Form initialData={meetup} onSubmit={handleSubmit}>
        <FileInput
          name="file_id"
          fileId={meetup.file ? meetup.file.id : null}
          fileUrl={meetup.file ? meetup.file.url : null}
          hasInitialFile={!!meetup.file}
        />

        <Input name="title" placeholder="Meetup title" />
        <Input
          multiline
          name="description"
          placeholder="Complete Description"
          rows={10}
          cols={30}
          value={meetup.description}
        />
        <hr />
        <div>
          <DatePicker
            name="date"
            selectedDate={new Date(meetup.formattedDate || new Date())}
          />
        </div>
        <Input name="location" placeholder="Location" />

        <button name="submit" id="submit" type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <strong>Save Meetup</strong>
        </button>
      </Form>
    </Container>
  );
}
Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      experiment: PropTypes.string,
    }),
  }).isRequired,
};
