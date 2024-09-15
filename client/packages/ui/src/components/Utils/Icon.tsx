enum Icons {
  Like = 'Like',
  Save = 'Save',
  Album = 'Album',
  Folder = 'Folder',
  Artist = 'Artist',
}

type IconProps = {
  icon: Icons;
  width: number;
  height: number;
  className: string;
};

function Icon({ icon, width, height, className }: Partial<IconProps>) {
  return (
    <svg height={height} width={width} className={className}>
      <use height={height} href={`./sprites.svg#${icon}`} width={width} />
    </svg>
  );
}

export { Icon, Icons };
