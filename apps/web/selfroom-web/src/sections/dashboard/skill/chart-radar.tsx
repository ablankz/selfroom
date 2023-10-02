// @mui
import { styled } from '@mui/material/styles';
// components
import Chart, { useChart } from '@/components/chart';
import { useResponsive } from '@/hooks/use-responsive';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 340;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    marginBottom: theme.spacing(3),
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  labels: {
    show?: boolean;
    rotate?: number;
    rotateAlways?: boolean;
    hideOverlappingLabels?: boolean;
    showDuplicates?: boolean;
    trim?: boolean;
    minHeight?: number;
    maxHeight?: number;
    style?: {
      colors?: string | string[];
      fontSize?: string;
      fontFamily?: string;
      fontWeight?: string | number;
      cssClass?: string;
    };
    offsetX?: number;
    offsetY?: number;
    format?: string;
    formatter?(
      value: string,
      timestamp?: number,
      opts?: any
    ): string | string[];
    datetimeUTC?: boolean;
    datetimeFormatter?: {
      year?: string;
      month?: string;
      day?: string;
      hour?: string;
      minute?: string;
      second?: string;
    };
  };
};

export default function ChartRadar({ series, categories, labels }: Props) {
  const mdUp = useResponsive('up', 'md');
  const chartOptions = useChart({
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.48,
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    xaxis: {
      categories,
      labels,
    },
  });

  return (
    <StyledChart
      dir="ltr"
      type="radar"
      series={series}
      options={chartOptions}
      height={320}
      width={mdUp ? 400 : 370}
    />
  );
}
