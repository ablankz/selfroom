import { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
//
import { fileData, fileFormat, fileThumb } from './utils';
import DownloadButton from './download-button';
import { HOST_ASSET } from '@/config-global';
import { uuidHash } from '@/utils/uuid-hash';

// ----------------------------------------------------------------------

type FileIconProps = {
  file: File | string;
  tooltip?: boolean;
  imageView?: boolean;
  onDownload?: VoidFunction;
  sx?: SxProps<Theme>;
  imgSx?: SxProps<Theme>;
  uuid?: string;
};

export default function FileThumbnail({
  file,
  tooltip,
  imageView,
  onDownload,
  sx,
  imgSx,
  uuid,
}: FileIconProps) {
  const { name = '', path = '', preview = '' } = fileData(file);

  const format = fileFormat(path || preview);

  const renderContent =
    format === 'image' && imageView ? (
      <Box
        component="img"
        src={preview}
        onError={e => {
          // @ts-ignore
          e.target.onError = null; // 下記画像が取得できない場合の無限ループを防ぐため、nullを代入
          const index = uuid ? uuidHash(uuid, 0, 39) : 0;
          // @ts-ignore
          e.target.src = `${HOST_ASSET}/images/cover/cover_${index}.jpg`;
        }}
        sx={{
          width: 1,
          height: 1,
          flexShrink: 0,
          objectFit: 'cover',
          ...imgSx,
        }}
      />
    ) : (
      <Box
        component="img"
        src={fileThumb(format)}
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          ...sx,
        }}
      />
    );

  if (tooltip) {
    return (
      <Tooltip title={name}>
        <Stack
          flexShrink={0}
          component="span"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 'fit-content',
            height: 'inherit',
          }}
        >
          {renderContent}
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </Stack>
      </Tooltip>
    );
  }

  return (
    <>
      {renderContent}
      {onDownload && <DownloadButton onDownload={onDownload} />}
    </>
  );
}
