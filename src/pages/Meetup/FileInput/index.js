import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import api from '~/services/api';
import { Container } from './styles';
import pickImage from '~/assets/pickImage.png';

export default function FileInput(props) {
  const { fileId, fileUrl, hasInitialFile } = props;
  let file = fileId;
  let preview = fileUrl;
  const _hasFile = hasInitialFile;

  const { defaultValue, registerField } = useField('file');

  const [hasFile, setHasFile] = useState(_hasFile);

  const [updatedFile, setUpdatedFile] = useState(
    defaultValue && defaultValue.id
  );
  const [updatedPreview, setUpdatedPreview] = useState(
    defaultValue && defaultValue.url
  );

  // get current property
  const ref = useRef();

  // register field on Unform Component
  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        // dataset.file get data from  data-file
        path: 'dataset.file',
      });
    }
  }, [preview, ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;
    file = id;
    preview = url;
    setHasFile(true);
    setUpdatedFile(id);
    setUpdatedPreview(url);
  }

  return (
    <Container hasFile={hasFile || hasInitialFile}>
      <label htmlFor="file">
        <div>
          <input
            type="file"
            id="file"
            accept="image/*"
            data-file={updatedFile || file}
            onChange={handleChange}
            ref={ref}
          />
          <img src={updatedPreview || preview || pickImage} alt="" />
        </div>
      </label>
    </Container>
  );
}
FileInput.defaultProps = {
  fileId: null,
  fileUrl: null,
};

FileInput.propTypes = {
  fileId: PropTypes.number,
  fileUrl: PropTypes.string,
  hasInitialFile: PropTypes.bool.isRequired,
};
