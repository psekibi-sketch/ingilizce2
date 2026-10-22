package com.example

import com.example.data.DaysRepository
import com.example.data.QuestionDirection
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test

class ExampleUnitTest {
    @Test
    fun testAllDaysCountAndData() {
        val days = DaysRepository.allDays
        assertEquals(7, days.size)

        val monday = DaysRepository.getDayById(1)
        assertNotNull(monday)
        assertEquals("Monday", monday?.en)
        assertEquals("Pazartesi", monday?.tr)

        val sunday = DaysRepository.getDayById(7)
        assertNotNull(sunday)
        assertEquals("Sunday", sunday?.en)
        assertEquals("Pazar", sunday?.tr)
        assertTrue(sunday?.isWeekend == true)
    }

    @Test
    fun testQuestionQueueGeneration() {
        val queue = DaysRepository.generateQuestionQueue(20)
        assertEquals(20, queue.size)

        queue.forEach { q ->
            assertEquals(4, q.options.size)
            assertTrue(q.options.any { it.id == q.target.id })
            assertNotNull(q.direction)
        }
    }
}
