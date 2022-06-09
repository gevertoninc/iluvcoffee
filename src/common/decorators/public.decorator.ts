import { SetMetadata } from '@nestjs/common';

const IS_PUBLIC = 'isPublic';

const Public = () => SetMetadata(IS_PUBLIC, true);

export { IS_PUBLIC, Public };
