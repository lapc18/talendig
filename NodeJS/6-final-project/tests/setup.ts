jest.mock('sequelize-typescript', () => {
  const actual = jest.requireActual('sequelize-typescript');
  // Mock decorators to return the class as-is
  const mockDecorator = () => (target: any) => target;
  return {
    ...actual,
    Table: mockDecorator,
    Column: mockDecorator,
    ForeignKey: mockDecorator,
    BelongsTo: mockDecorator,
    HasMany: mockDecorator,
  };
});

jest.mock('../src/config/db', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined),
    sync: jest.fn().mockResolvedValue(undefined),
  },
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

