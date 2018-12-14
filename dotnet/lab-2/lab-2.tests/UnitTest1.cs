using System;
using Xunit;

namespace lab_2.tests
{
    public class UnitTest1
    {
        [Fact(DisplayName="Hello test 1")]
        public void Test1()
        {
            Assert.Equal(0, 0);
        }
        [Fact(DisplayName="Hello test 2")]
        public void Test2()
        {
            Assert.Equal(1, 1);
        }
    }
}
