import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const specs = YAML.load('src/swagger/swagger.yaml');
export const SwaggerUi = swaggerUi;
// export default {
//   swaggerUi,
//   specs,
// };
