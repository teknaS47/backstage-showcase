import { renderWithEffects } from '@backstage/test-utils';

jest.setTimeout(30_000);

describe('App', () => {
  it('should render', async () => {
    process.env = {
      NODE_ENV: 'test',
      APP_CONFIG: [
        {
          data: {
            app: {
              title: 'Test',
              support: { url: 'http://localhost:7007/support' },
            },
            backend: { baseUrl: 'http://localhost:7007' },
            lighthouse: {
              baseUrl: 'http://localhost:3003',
            },
            techdocs: {
              storageUrl: 'http://localhost:7007/api/techdocs/static/docs',
            },
          },
          context: 'test',
        },
      ] as any,
    };

    const { default: app } = await import('./App');
    const rendered = await renderWithEffects(app);
    expect(rendered.baseElement).toBeInTheDocument();
  });
});
